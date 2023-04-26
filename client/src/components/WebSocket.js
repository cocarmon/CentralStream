import { io } from 'socket.io-client';
const URL =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : process.env.REACT_APP_WEBSOCKET;
// By setting the transport method to websocket avoids cors restrictions of the polling transport protocol
export const socket = io(URL, { transports: ['websocket'] });
