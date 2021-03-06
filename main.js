const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

	var w = 1085;
	var h = 775;
	
	mainWindow = new BrowserWindow({
		width: w, height: h,
		minWidth: w, minHeight: h,
		maxWidth: w, maxHeight: h,
		title: "UnicodeTable",
		webgl: false,
		webaudio: false,
	});
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'www/index.html'),
		protocol: 'file:',
		slashes: true
	}));
	
	// mainWindow.webContents.openDevTools()
	
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', function(){

	createWindow();

	// https://pracucci.com/atom-electron-enable-copy-and-paste.html

	var name = app.getName();

	var about = "About " + name;
	var hide = "Hide " + name;
	var quit = "Quit " + name;
	
	var template = [{
		label: "Application",
		submenu: [
			{ label: about, selector: "orderFrontStandardAboutPanel:" },
			{ type: "separator" },
			{ label: hide, accelerator: "Command+H", click: function() { app.hide(); }},
			{ label: quit, accelerator: "Command+Q", click: function() { app.quit(); }}
		]}, {
			label: "Edit",
			submenu: [
				{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
				{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
				{ type: "separator" },
				{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
				{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
				{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
				{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
			]}
		       ];
	
	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});


app.on('window-all-closed', function () {
	
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	
	if (mainWindow === null) {
		createWindow();
	}
});
