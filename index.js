const { app, BrowserWindow } = require('electron');

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({ width: 1024, height: 768 });
  win.on('closed', () => {
    win = null;
  });
  win.loadURL('file://' + __dirname + "/index.html");
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
