import { io } from 'socket.io-client';
const URL = 'http://localhost:8080';
// By setting the transport method to websocket avoids cors restrictions of the polling transport protocol
export const socket = io(URL, { transports: ['websocket'] });
