import { Socket } from 'socket.io';

export interface SocketData {
  code: string;
  userId?: string;
  roomId?: string;
}

export interface ExtendedSocket extends Socket {
  userId?: string;
  roomId?: string;
}

