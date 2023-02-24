const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
    encrypt: (text, algo, size) => ipcRenderer.invoke('encrypt', text, algo, size)
})