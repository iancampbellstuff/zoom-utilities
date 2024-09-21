// externals
import { app, BrowserWindow } from 'electron';
import os from 'os';
import path from 'path';
// server
import startServer from '../../server/src';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

const createWindow = () => {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
        width: 1000,
        height: 600,
        useContentSize: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            nodeIntegrationInWorker: true,
            preload: path.resolve(
                __dirname,
                process.env.QUASAR_ELECTRON_PRELOAD!
            ),
            sandbox: false,
            webSecurity: false
        }
    });

    mainWindow.loadURL(process.env.APP_URL!);

    if (process.env.DEBUGGING) {
        // if on DEV or Production with debug enabled
        mainWindow.webContents.openDevTools();
    } else {
        // we're on production; no access to devtools pls
        mainWindow.webContents.on('devtools-opened', () => {
            mainWindow?.webContents.closeDevTools();
        });
    }

    mainWindow.on('closed', () => {
        mainWindow = undefined;
    });
};

const start = () => {
    try {
        startServer();
        createWindow();
    } catch (error) {
        console.error(error);
        app.quit();
    }
};

app.whenReady().then(start);

app.on('window-all-closed', () => {
    if (platform !== 'darwin') {
        app.quit();
    }
});

// Re-activate Application when in macOS dock
app.on('activate', () => {
    if (mainWindow === undefined) {
        start();
    }
});
