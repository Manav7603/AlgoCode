import http from 'http';
import { createApp } from './app';
import { setupSocketIO } from './socket/socket.setup';
import { SERVER_CONFIG } from './config/constants';

let io: ReturnType<typeof setupSocketIO>;

export function startServer(): http.Server {
  const app = createApp();
  const server = http.createServer(app);

  // Setup Socket.IO
  io = setupSocketIO(server);

  // Error handling
  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${SERVER_CONFIG.PORT} is already in use. Please wait a moment and try again.`);
      process.exit(1);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  });

  // Start server
  server.listen(SERVER_CONFIG.PORT, () => {
    console.log(`🚀 Server running on port ${SERVER_CONFIG.PORT}`);
    console.log(`📡 Socket.IO server ready`);
    console.log(`🌍 Environment: ${SERVER_CONFIG.NODE_ENV}`);
  });

  // Graceful shutdown handling
  setupGracefulShutdown(server, io);

  return server;
}

function setupGracefulShutdown(server: http.Server, io: ReturnType<typeof setupSocketIO>): void {
  const shutdown = (signal: string) => {
    console.log(`${signal} signal received: closing HTTP server`);
    io.close(() => {
      console.log('Socket.IO server closed');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

