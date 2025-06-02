import WebSocket from 'ws';

export const connectToWS = () =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://localhost:3100');

    ws.on('open', () => resolve(ws));
    ws.on('error', (err) => reject(err));
  });
