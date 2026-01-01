'use client';

import { CodeEditor } from '@/components/CodeEditor';
import { useCodeSync } from '@/hooks/useCodeSync';
import { APP_CONFIG, DEFAULT_CODE } from '@/constants';

export default function Home() {
  const { code, setCode, isConnected } = useCodeSync(DEFAULT_CODE);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold mb-2">{APP_CONFIG.APP_TAGLINE}</h1>
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-gray-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="w-full max-w-4xl p-4 border border-gray-700 rounded-lg">
        <CodeEditor code={code} onChange={setCode} />
      </div>

      <p className="mt-4 text-gray-500 text-sm">
        Open this page in two different tabs to test real-time collaboration!
      </p>
    </div>
  );
}