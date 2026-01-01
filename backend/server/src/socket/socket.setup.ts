import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { SERVER_CONFIG } from '../config/constants';
import { SocketHandlers } from './socket.handlers';

export function setupSocketIO(server: HttpServer): Server {
  const io = new Server(server, {
    cors: {
      origin: SERVER_CONFIG.CORS_ORIGIN,
      methods: ["GET", "POST"]
    }
  });

  const socketHandlers = new SocketHandlers(io);

  io.on('connection', (socket) => {
    socketHandlers.handleConnection(socket);
  });

  return io;
}

