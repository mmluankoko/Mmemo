const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const ipc = electron.ipcMain
const Menu = electron.Menu
const platform = require('os').platform()
const Tray = electron.Tray

const Config = require('electron-config')
const getID = require('shortid').generate
const path = require('path')
const url = require('url')
const win = require('electron-window')

// Single instance detection
const shouldQuit = app.makeSingleInstance((argv, wd) => {})
if (shouldQuit) {
  let msg
  if (platform === 'win32') {
    msg = 'Mmemo 已运行在 Windows 任务栏通知区域，\n请不要打开多个 Mmemo 实例。'
  } else if (platform === 'darwin'){
    msg = 'Mmemo 已运行在 MacOS 菜单栏，\n请不要打开多个 Mmemo 实例。'
  } else {
    msg = 'Mmemo 已运行，\n请不要打开多个 Mmemo 实例。'
  }
  dialog.showErrorBox('Mmemo 已运行', msg)
  app.quit()
}

// Load config and lib files, init them if not existed
const memoLib  = new Config({name:'memoLib'})
const conf = new Config({name:'conf'})
if (!conf.has('advancedMode')) conf.set('advancedMode', false)
if (!conf.has('toolbar')) conf.set('toolbar', false)
if (!conf.has('locked')) conf.set('locked', false)

// Page path
const memoPagePath = path.resolve(__dirname,  'src', 'memo.html')
const aboutPagePath = path.resolve(__dirname, 'src', 'about.html')
const toolbarPagePath = path.resolve(__dirname, 'src', 'toolbar.html')

// Globals
let debug = false
let tray = null
let toolbarWindow
let aboutWindow
let memoWindows = {}

app.on('ready', () => {
  // Setup tray icon
  let iconPath
  if (platform === 'darwin') {
    iconPath = path.join(__dirname, 'asset', 'trayTemplate.png')
  }
  if (platform === 'win32') {
    iconPath = path.join(__dirname, 'asset', 'tray.ico')
  }
  // Setup tray and its menu
  tray = new Tray(iconPath)
  let contextMenu = getTrayMenu()
  tray.setToolTip('Mmemo')
  tray.setContextMenu(contextMenu)
  if (platform === 'win32')
    tray.on('click', () => showMemos())

  // Show existing memos if there is any, create a new one otherwise
  if (memoLib.size == 0)
    newMemo()
  else {
    for (let id in memoLib.store) {
      showMemo(id)
    }
  }

  // show the toolbar if set to on
  if (conf.get('toolbar')) {
    showToolbar()
  }
})

app.on('before-quit', function(){
  // destory aboutWindow if there is one
  if (aboutWindow) {
    aboutWindow.destroy()
  }
  // destory toolbarWindow after saving its position
  if (toolbarWindow) {
    let pos = toolbarWindow.getPosition()
    conf.set('toolbarPos', pos)
    toolbarWindow.destroy()
  }
  // destory all memoWindows after saving their bounds
  for (let id in memoWindows) {
    let bounds = memoWindows[id].getBounds()
    console.log(bounds)
    let tmp = memoLib.get(id)
    tmp.bounds = bounds
    memoLib.set(id, tmp)
    memoWindows[id].destroy()
  }
})

app.on('window-all-closed', function () {
})

app.on('activate', function () {
})

ipc.on('new-memo', ()=>newMemo())

ipc.on('show-memos', ()=>showMemos())

ipc.on('set-memo', (e, d) => {
  memoLib.set(d.id, d)
})

ipc.on('del-memo', (e, id) => {
  let tmp = memoWindows[id]
  memoLib.delete(id)
  delete memoWindows[id]
  tmp.destroy()
})

ipc.on('pin-memo', (e, id) => {
  memoWindows[id].setAlwaysOnTop(true)
})

ipc.on('unpin-memo', (e, id) => {
  memoWindows[id].setAlwaysOnTop(false)
})


// helpers
function showMemo(id) {
  let memo = memoLib.get(id)
  let x,y,w,h
  if (!memo.bounds) {
    w = 400
    h = 185
  } else {
    x = memo.bounds.x
    y = memo.bounds.y
    w = memo.bounds.width
    h = memo.bounds.height
  }
  memoWindows[id] = win.createWindow({
    x: x,
    y: y,
    width: w,
    height: h,
    alwaysOnTop: memo.pinned,
    // transparent: debug ? false : false,
    resizable: debug ? true : false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    backgroundColor: '#00FFFFFF',
    scrollBounce: false,
    frame: debug ? true : false,
    skipTaskbar: true,
    acceptFirstMouse: true
  })
  if (memo.mode === 'lock')
    memoWindows[id].setIgnoreMouseEvents(true)
  memo.advancedMode = conf.get('advancedMode')
  memoWindows[id].showUrl(memoPagePath, memo)
}

function showAbout(){
  aboutWindow = win.createWindow({
    width: 310,
    height: 345,
    useContentSize: true,
    frame: false,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    scrollBounce: false,
    backgroundColor: '#00FFFFFF'
  })
  aboutWindow.showUrl(aboutPagePath)
}

function showToolbar(){
  let toolbarPos
  if (conf.has('toolbarPos')) {
    toolbarPos = conf.get('toolbarPos')
  }
  toolbarWindow = win.createWindow({
    x: toolbarPos ? toolbarPos[0] : null,
    y: toolbarPos ? toolbarPos[1] : null,
    width: 160,
    height: 25,
    useContentSize: true,
    frame: false,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    scrollBounce: false,
    backgroundColor: '#00FFFFFF',
    alwaysOnTop:true,
    transparent:true,
    hasShadow:false,
    focusable: false,
    skipTaskbar: true,
    acceptFirstMouse: true
  })
  toolbarWindow.showUrl(toolbarPagePath, {locked:conf.get('locked')})
}


function newMemo() {
  let id =getID()
  while (memoLib.has(id)) {
    id = getID()
  }
  let memo = {}
  memo.id = id
  memo.title = '新便签'
  memo.content = ''
  memo.mode = 'edit'
  memo.pinned = false
  memoLib.set(id,memo)
  showMemo(id)
}

function showMemos(){
  if (JSON.stringify(memoWindows)!==JSON.stringify({})) {
    for (let id in memoWindows) {
      memoWindows[id].showInactive()
    }
  }
}

function toogleToobar(on){
  if (on) {
    if (!toolbarWindow) {
      showToolbar()
      conf.set('toolbar',true)
    }
  }
  else {
    if (toolbarWindow) {
      let pos = toolbarWindow.getPosition()
      conf.set('toolbarPos', pos)
      toolbarWindow.destroy()
      toolbarWindow=null
      conf.set('toolbar',false)
    }
  }
}

function broadCast(c) {
  for (let id in memoWindows) {
    if (memoWindows[id]) {
      memoWindows[id].webContents.send(c)
    }
  }
}

function getTrayMenu(){
  let m = Menu.buildFromTemplate(
    [{
      label: '新便签...',
      click: () => newMemo()
    },
    {
      label: '显示工具栏',
      type: 'checkbox',
      checked: conf.get('toolbar'),
      click: (e) => {toogleToobar(e.checked)}
    },
    // {
    //   label: '全部解锁',
    //   click: () => {broadCast('unlock')
    //                 for (let id in memoWindows)
    //                   memoWindows[id].setIgnoreMouseEvents(false)
    //                 }
    // },{
    //   label: '全部锁定',
    //   click: () => {broadCast('lock')
    //                 for (let id in memoWindows)
    //                   memoWindows[id].setIgnoreMouseEvents(true)
    //                 }
    // },
    // {
    //   label: '高级模式',
    //   type: 'checkbox',
    //   checked: conf.get('advancedMode'),
    //   click: (e) =>{let checked = e.checked
    //                 conf.set('advancedMode', checked)
    //                 if (checked)
    //                   broadCast('advancedModeOn')
    //                 else
    //                   broadCast('advancedModeOff')
    //               }
    // },
    {
      type: 'separator'
    },{
      label: '关于...',
      click: () => showAbout()
    },{
      label: '退出',
      click: () => app.quit()
    },{
      label: '清空(debug)',
      click: () => memoLib.clear()
    }]
  )
  return m
}
