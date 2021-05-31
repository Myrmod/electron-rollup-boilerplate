import electron, { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import url from 'url'

/**
 * @todo has to be imported from somewhere else
 *
 * @function createWindow
 * @category MainProcess
 * @param {electron.Display} display the monitors or displays found by electron
 * @param {Electron.BrowserWindowConstructorOptions | undefined} settings the configuration for the displays from https://www.electronjs.org/docs/api/browser-window
 * @param data {any} (optional) | the data that will be passed as initial payload to the created window
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
   }

   const window = new BrowserWindow({ ...defaultSettings, ...settings })
   window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
   }))
   window.on('closed', () => app.quit())

   // prevents overwriting of page
   window.on('page-title-updated', (e) => e.preventDefault())

   window.webContents.on('dom-ready', () => {
      window.webContents.send('initialPayload', data)
   })

   return window
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const windows: Array<electron.BrowserWindow> = []

/**
 * @function AppOnReady
 * @category MainProcess
 * @description listen for app to be ready so it can start the creation of the windows with their respective initial data payload.
 */
app.on('ready', () => {
   const displays = electron.screen.getAllDisplays()

   displays.map((display, index) => {
      windows[index] = createWindow(display, {}, { id: index })
      windows[index].setTitle(`window ${index}`)
   })
})

/**
 * @category MainProcess
 * @event request-update-window
 * @type EventListener
 * @description listens for the request-update-window event coming from any open window and sends the same event to the requested window.
 */
ipcMain.on(`request-update-window`, (event, data) => {
   windows[data.id].webContents.send(`request-update-window`, data)
})
