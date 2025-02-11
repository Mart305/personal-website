import React, { useState, useRef, useEffect } from 'react';

const CommandLine: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [workingDirectory, setWorkingDirectory] = useState('/home/user');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  ls       - List directory contents',
      '  cd       - Change directory',
      '  cat      - View file contents',
      '  touch    - Create a new file',
      '  rm       - Remove a file',
      '  clear    - Clear the terminal',
    ],
    ls: () => [
      'Documents/',
      'Pictures/',
      'Downloads/',
      'example.txt',
      'README.md',
    ],
    cd: (args: string) => {
      if (!args) return ['Usage: cd <directory>'];
      setWorkingDirectory(prev => 
        args === '..' 
          ? prev.split('/').slice(0, -1).join('/') || '/'
          : `${prev}/${args}`.replace(/\/+/g, '/')
      );
      return [];
    },
    cat: (args: string) => {
      if (!args) return ['Usage: cat <filename>'];
      return ['This is the content of ' + args];
    },
    touch: (args: string) => {
      if (!args) return ['Usage: touch <filename>'];
      return ['Created file: ' + args];
    },
    rm: (args: string) => {
      if (!args) return ['Usage: rm <filename>'];
      return ['Removed file: ' + args];
    },
    clear: () => {
      setHistory([]);
      return [];
    },
  };

  const executeCommand = (input: string) => {
    const [cmd, ...args] = input.trim().split(' ');
    const command = commands[cmd as keyof typeof commands];
    
    if (command) {
      return command(args.join(' '));
    }
    return [`Command not found: ${cmd}. Type 'help' for available commands.`];
  };

  const handleCommand = () => {
    if (!currentCommand.trim()) return;

    const newHistory = [
      ...history,
      `${workingDirectory}$ ${currentCommand}`,
      ...executeCommand(currentCommand)
    ];

    setHistory(newHistory);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [history]);

  useEffect(() => {
    setHistory([
      'Welcome to the Command Line Interface!',
      "Type 'help' for available commands.",
      '',
    ]);
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen p-4">
      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-sm">
        <div 
          ref={historyRef}
          className="h-[500px] overflow-y-auto mb-4 text-gray-300 whitespace-pre-wrap"
        >
          {history.map((line, i) => (
            <div key={i} className="mb-1">{line}</div>
          ))}
        </div>
        <div className="flex items-center text-gray-300">
          <span className="mr-2">{workingDirectory}$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default CommandLine;
