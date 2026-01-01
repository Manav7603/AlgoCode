'use client';

import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  placeholder?: string;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  placeholder = '// Start coding here...',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={code}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full h-96 p-4 bg-black text-green-400 font-mono text-lg outline-none resize-none rounded ${className}`}
      spellCheck={false}
    />
  );
};

