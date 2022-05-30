const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

const PORT = 3000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Imamo novog klijenta!');

  ws.send('Dobrodošao na chat room!');

  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});
