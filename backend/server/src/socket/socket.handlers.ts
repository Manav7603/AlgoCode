import { Server, Socket } from 'socket.io';
import { SocketData } from '../types/socket.types';

export class SocketHandlers {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public handleConnection(socket: Socket): void {
    console.log(`User connected: ${socket.id}`);

    // Event: When a player types code
    socket.on('code_change', (data: string | SocketData) => {
      this.handleCodeChange(socket, data);
    });

    socket.on('disconnect', () => {
      this.handleDisconnect(socket);
    });
  }

  private handleCodeChange(socket: Socket, data: string | SocketData): void {
    // Broadcast this code to EVERYONE else in the room
    // Handle both string and object formats for backward compatibility
    const codeData = typeof data === 'string' ? data : data.code || data;
    socket.broadcast.emit('receive_code', codeData);
  }

  private handleDisconnect(socket: Socket): void {
    console.log(`User disconnected: ${socket.id}`);
  }
}

