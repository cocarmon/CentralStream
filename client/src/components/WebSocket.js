import { io } from 'socket.io-client';
const URL = process.env.REACT_APP_WEBSOCKET || 'http://localhost:8080';
// By setting the transport method to websocket avoids cors restrictions of the polling transport protocol
export const socket = io(URL, { transports: ['websocket'] });
