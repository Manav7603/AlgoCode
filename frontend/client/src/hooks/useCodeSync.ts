import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { SocketData } from '@/types/socket.types';

export const useCodeSync = (initialCode: string = '// Start coding here...') => {
  const [code, setCode] = useState<string>(initialCode);
  const { on, off, emit, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    // Listen for code changes from other users
    const handleReceiveCode = (data: SocketData) => {
      if (typeof data === 'string') {
        setCode(data);
      } else if (data.code) {
        setCode(data.code);
      }
    };

    on('receive_code', handleReceiveCode);

    return () => {
      off('receive_code');
    };
  }, [isConnected, on, off]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // Send code change to server
    emit('code_change', newCode);
  };

  return {
    code,
    setCode: handleCodeChange,
    isConnected,
  };
};

