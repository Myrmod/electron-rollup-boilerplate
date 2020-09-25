import electron from 'electron'
import { __dirname } from 'globalthis/implementation'
import path from 'path'
import url from 'url'
const { app, BrowserWindow } = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// listen for app to be ready
app.on('ready', () => {
	mainWindow = new BrowserWindow({})

	// load html into window
	mainWindow.loadURL(url.format({
		pathname: path.join(app.getAppPath(), 'build', 'index.html'),
		protocol: 'file:',
		slashes: true,
	}))
})
