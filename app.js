const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const dialog = electron.dialog
const Menu = electron.Menu
const Tray = electron.Tray
const platform = require('os').platform()

const path = require('path')
const url = require('url')
const win = require('electron-window')
const getID = require('shortid').generate
const Config = require('electron-config')

const memoLib = new Config({name:'memoLib'})
const memoPagePath = path.resolve(__dirname, 'src', 'memo.html')
const aboutPagePath = path.resolve(__dirname, 'src', 'about.html')

let appIcon = null
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
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate(
    [{
      label: '新便签...',
      click: () => newMemo()
    },{
      label: '全部解锁',
      click: () => broadCast('unlock')
    },{
      label: '全部锁定',
      click: () => broadCast('lock')
    },{
      type: 'separator'
    },{
      label: '关于...',
      click: () => showAbout()
    },{
      label: '退出',
      click: () => app.quit()
    }]
  )
  appIcon.setToolTip('Mmemo')
  appIcon.setContextMenu(contextMenu)

  // show exsiting memos
  for (let id in memoLib.store) {
    showMemo(id)
  }
})

app.on('window-all-closed', function () {
})

app.on('activate', function () {
})

ipc.on('set-memo', (e, d) => {
  memoLib.set(d.id, d)
})

ipc.on('del-memo', (e, id) => {
  memoLib.delete(id)
  memoWindows[id].close()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function showMemo(id) {
  let memos = memoLib.store
  let x,y,w,h
  if (!memos[id].bounds) {
    w = 400
    h = 400
  } else {
    x = memos[id].bounds.x
    y = memos[id].bounds.y
    w = memos[id].bounds.width
    h = memos[id].bounds.height
  }
  memoWindows[id] = win.createWindow({
    x: x,
    y: y,
    width: w,
    height: h,
    transparent: true,
    // useContentSize: true,
    frame: false,
    skipTaskbar: true
  })
  memoWindows[id].on('close', (e) => {
    bounds = e.sender.getBounds()
    console.log(bounds)
    let tmp = memoLib.get(id)
    tmp.bounds = bounds
    memoLib.set(id, tmp)
  })
  memoWindows[id].showUrl(memoPagePath, memoLib.store[id])
}

function showAbout(){
  aboutWindow = win.createWindow({
    width: 310,
    height: 400,
    transparent: false,
    frame: true
  })
  aboutWindow.showUrl(aboutPagePath)
}

function newMemo() {
  let id = getID()
  let memo = {}
  memo.id = id
  memo.title = '新便签'
  memo.content = ''
  memo.locked = false
  memo.editMode = true
  memoLib.set(id,memo)
  showMemo(id)
}

function broadCast(c) {
  for (let id in memoWindows) {
    memoWindows[id].webContents.send(c)
  }
}
