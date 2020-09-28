import electron, { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import path from 'path';
import url from 'url';

/**
 * TODO: has to be imported from somewhere else
 * @param display
 * @param settings
 */
function createWindow(display: electron.Display, settings?: Electron.BrowserWindowConstructorOptions | undefined, data?: any) {
   const defaultSettings = {
      x: display.bounds.x,
      y: display.bounds.y,
      // width: display.bounds.width,
      // height: display.bounds.height,
      webPreferences: {
         nodeIntegration: true,
         worldSafeExecuteJavaScript: true,
      },
      backgroundColor: '#fff',
   };

   const window = new BrowserWindow({ ...defaultSettings, ...settings });
   window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
   }));
   window.on('closed', () => app.quit());

   // prevents overwriting of page
   window.on('page-title-updated', (e) => e.preventDefault());

   return window;
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const windows: Array<electron.BrowserWindow> = [];

// listen for app to be ready
app.on('ready', () => {
   const displays = electron.screen.getAllDisplays();

   displays.map((display, index) => {
      windows[index] = createWindow(display, {}, index);
      windows[index].setTitle(`window ${index}`);
      windows[index].webContents.on('dom-ready', () => {
         console.log('did finish loading');

         windows[index].webContents.send('initialPayload', { id: index });
      });
   });
});

// Attach event listener to event that requests to update something in another window
ipcMain.on(`request-update-window`, (event, data) => {
   // Request to update the label in the renderer process of the second window
   // We'll send the same data that was sent to the main process
   // Note: you can obviously send the
   console.log(data);

   windows[data.id].webContents.send(`request-update-window`, data);
});
/**
 * for each window we add the update window eventlistener as well as the ability to dispatch such events
 */
windows.map((window, index) => {
   ipcRenderer.on(`request-update-window`, (event, data) => {
      // data contains the data sent from the first view
      console.log('ipcRenderer', data);

      ipcRenderer.send('reply', `received ${data}`);
   });
   ipcRenderer.on('reply', (event, message) => console.log(message));
});
