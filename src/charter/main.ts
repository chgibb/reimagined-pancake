/// <reference path="../../node.d.ts" />

/// <reference path="../../electron.d.ts" />


const electron = require("electron");

const app : Electron.App = electron.app;

const browserWindow = electron.BrowserWindow;

let mainWindow : Electron.BrowserWindow;

function createMainWindow() : void 
{
  mainWindow = new browserWindow({width: 800, height: 600})

  mainWindow.loadURL("file://"+process.cwd()+"/resources/app/index.html")

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed',()=>
  {
    mainWindow = null
  });
}

app.on('ready', createMainWindow);


app.on('window-all-closed',()=>
{
  if(process.platform !== 'darwin') 
  {
      app.quit();
  }
});

app.on('activate',()=>
{
    if(mainWindow === null) 
    {
        createMainWindow();
    }
});
