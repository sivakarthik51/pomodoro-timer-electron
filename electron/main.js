const { app, BrowserWindow, ipcMain, Tray, Notification } = require('electron');
const { channels } = require('../src/shared/constants');
const path = require('path');
let tray = undefined;
let window = undefined;
// Don't show the app in the doc
app.dock.hide();


const createTray = () => {
    tray = new Tray(path.join(__dirname,'/pomodoro-icon.png'));
    tray.on('click', function (event) {
        toggleWindow();
    })
}

const toggleWindow = () => {
    window.isVisible() ? window.hide() : showWindow();
}

const showWindow = () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    window.show();
}

const getWindowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();
    
    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)
    return {x: x, y: y}
}

const createWindow = () => {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      });
      window = new BrowserWindow({
        width: 320,
        height: 420,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: false,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          backgroundThrottling: false
        }
      });
      window.loadURL(startUrl);
      window.on('closed', function () {
        window = null;
      });
    // Hide the window when it loses focus
    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide();
        }
    });
}

app.on('ready', () => {
    createTray();
    createWindow();
});

ipcMain.on('show-window', () => {
    showWindow()
})
ipcMain.on(channels.QUIT, (event) => {
    app.quit();
});

ipcMain.on(channels.FIN, (event) => {
    const notification = {
        title: 'Time Up!',
        body: 'Take a break!'
      }
      new Notification(notification).show()
});