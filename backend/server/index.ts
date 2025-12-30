import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// 1. Create the HTTP server
const server = http.createServer(app);


// 2. Create the WebSocket server (The "Real-Time" layer)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // This is where your Next.js app will run
    methods: ["GET", "POST"]
  }
});


// 3. Listen for events
io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Event: When a player types code
  socket.on('code_change', (data: any) => {
    // Broadcast this code to EVERYONE else in the room
    socket.broadcast.emit('receive_code', data); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

// 4. Start the server
server.listen(3001, () => {
  console.log('GAME SERVER RUNNING ON PORT 3001');
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error('Port 3001 is already in use. Please wait a moment and try again.');
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  io.close(() => {
    console.log('Socket.IO server closed');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  io.close(() => {
    console.log('Socket.IO server closed');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
});