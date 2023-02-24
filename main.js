const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const { createHash } = require('crypto')
const path = require('path')

function handleEncrypt(text, algo, size) {
    if (text === '') {
        return "Try inputing some words"
    }
    try {
      const hash = createHash(algo)
      hash.update(text)
      const output = hash.digest('hex')
      if (size !== '') {
        return output.slice(0, size)
      } else {
        return output
      }
    } catch (error) {
      return "There was an error getting that hash"
    }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 525,
    minHeight: 550,
    minWidth: 500,
    maxHeight: 600,
    maxWidth: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('encrypt', (event, text, algo, size) => handleEncrypt(text, algo, size))
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})