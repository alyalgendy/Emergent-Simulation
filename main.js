// Electron-based GUI (JavaScript)
const { app, BrowserWindow } = require('electron');
const WebSocket = require('ws');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  const wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    ws.on('message', (message) => {
      console.log('Received:', message);
      // Forward the data to the simulation engine or GUI
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
