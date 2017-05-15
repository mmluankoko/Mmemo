const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const dialog = electron.dialog
const Menu = electron.Menu
const Tray = electron.Tray

const path = require('path')
const url = require('url')
const win = require('electron-window')
const getId = require('shortid').generate

let appIcon = null
let mainWindow
let memoWindows = {}
let memos = {
  '23TplPdS': {
    id: '23TplPdS', title: 'title 1', content: 'A controlling editorial pretends after the basket.'
  },
  '46Juzcyx': {
    id: '46Juzcyx', title: 'title 2', content: 'The sheer gate pops below his drivel.'
  }
}

app.on('ready', () => {

  const iconPath = path.join(__dirname, 'asset', 'task-icon.png')
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate(
    [{
      label: '新便签',
      click: function () {
        event.sender.send('tray-removed')
      }
    },{
      type: 'separator'
    },{
      label: '退出',
      click: () => app.quit()
    }]
  )
  appIcon.setToolTip('Mmemo')
  appIcon.setContextMenu(contextMenu)

  for (let id in memos) {
    let m = win.createWindow({
      width: 400,
      height: 400,
      // transparent: true,
      // useContentSize: true,
      frame: true
    })
    const data = memos[id]
    const pagePath = path.resolve(__dirname, 'src', 'memo.html')

    m.showUrl(pagePath, data)
  }
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
