const { app, BrowserWindow } = require('electron');

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.on('closed', () => {
    win = null;
  });
  win.webContents.openDevTools();
  win.loadURL('file://' + __dirname + "/index.html");
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});