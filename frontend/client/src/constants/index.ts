export const APP_CONFIG = {
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
  APP_NAME: 'AlgoCode',
  APP_TAGLINE: '1v1 Code Battle Arena',
} as const;

export const DEFAULT_CODE = '// Start coding here...';

