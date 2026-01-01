import cors from 'cors';
import { SERVER_CONFIG } from '../config/constants';

export const corsMiddleware = cors({
  origin: SERVER_CONFIG.CORS_ORIGIN,
  credentials: true,
});

