import io from 'socket.io-client';
let socketConnected = false, socket; 

export function connectSocketServer() {
    socket = io('http://localhost:2222/');
    socketConnected = true;
    return socket;
}

export function getSocket() {
    return socketConnected ? socket : connectSocketServer();
}