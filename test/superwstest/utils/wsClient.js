import request from 'superwstest';

// Allow base URL to be set via environment variable, fallback to localhost
const WS_BASE_URL = process.env.WS_BASE_URL || 'http://localhost:3100';

// Export a function to get the server instance
export const getServer = () => request(WS_BASE_URL);

// Export a function to connect to WebSocket with optional path and options
export const connectToWS = (path = '/', wsOptions = {}) => {
  return getServer().ws(path, wsOptions);
};
