"use client"; // Tells Next.js this is a client-side component (interactive)

import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export default function Home() {
  const [code, setCode] = useState<string>("// Start coding here...");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to our backend
    socketRef.current = io("http://localhost:3001");

    const socket = socketRef.current;

    // Listen for code coming from the server (the other player)
    socket.on("receive_code", (data: string) => {
      setCode(data);
    });

    // Cleanup when leaving the page
    return () => {
      socket.off("receive_code");
      socket.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // Send my new code to the server
    if (socketRef.current) {
      socketRef.current.emit("code_change", newCode);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">1v1 Code Battle Arena</h1>
      
      <div className="w-full max-w-4xl p-4 border border-gray-700 rounded-lg">
        <textarea
          value={code}
          onChange={handleChange}
          className="w-full h-96 p-4 bg-black text-green-400 font-mono text-lg outline-none resize-none rounded"
          spellCheck="false"
        />
      </div>
      
      <p className="mt-4 text-gray-500">Open this page in two different tabs to test!</p>
    </div>
  );
}