const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Store = require('./Store.js');
const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");
// const express = require('express');
// const server = express();
// server.use('/', express.static(__dirname));

let mainWindow;

//init store and defaults
const store = new Store({
  configName: 'user-data',
  defaults : {
    settings: {
      email: '',
      password: ''
    }
  }
})


// setupTitlebar();
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1024,
    // minWidth: 1280,
    // minHeight: 750,
    center: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',

    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be'
    },
    trafficLightPosition: {
      x: 15,
      y: 13,  // macOS traffic lights seem to be 14px in diameter. If you want them vertically centered, set this to `titlebar_height / 2 - 7`.
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // preload: path.join(__dirname, 'preload.js')
    }
  });
  
  // const infos = server.listen(0, 'localhost', () => mainWindow.loadURL(`http://localhost:3000/index.html`));

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  // attachTitlebarToWindow(mainWindow);
 
}

app.on('ready', () => {
  createWindow();

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send('settings:get', store.get('settings'))
  })
});

//set credentials
ipcMain.on('settings:set', (e, value) => {
  store.set('settings', value);
  mainWindow.webContents.send('settings:get', store.get('settings'))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
}); 



// const electron = require('electron');
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
// const menu = electron.Menu;

// const path = require('path');
// const url = require('url');
// const isDev = require('electron-is-dev');
// const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");

// let mainWindow;

// setupTitlebar();

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1600,
//     height: 1024,
//     // minWidth: 1280,
//     // minHeight: 720,
//     // center: true,
//     frame: false,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       webviewTag: true,
//       nativeWindowOpen: true, // This flag is not letting recieve new-window event from webview
//       nodeIntegration: true
//     }
//   });

//   mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
//   // mainWindow.loadFile('index.html')

//   mainWindow.on('closed', () => mainWindow = null);
//   // mainWindow.setMenuBarVisibility(false);
//   attachTitlebarToWindow(mainWindow);

// }

// menu.setApplicationMenu(false);

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow();
//   }
// }); 