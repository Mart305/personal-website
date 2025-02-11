import React, { useState } from 'react';

interface File {
  name: string;
  type: 'text' | 'image';
  content: string;
  size: number;
  isPasswordProtected?: boolean;
}

interface Directory {
  [key: string]: File;
}

const MockOSVisualizer: React.FC = () => {
  const [fileSystem, setFileSystem] = useState<Directory>({});
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [password, setPassword] = useState('');

  const executeCommand = (command: string) => {
    const parts = command.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'touch':
        if (args.length < 2) {
          addOutput('Usage: touch <filename> <type>');
          return;
        }
        const [filename, type] = args;
        if (type !== 'text' && type !== 'image') {
          addOutput('Error: type must be text or image');
          return;
        }
        createFile(filename, type);
        break;

      case 'cat':
        if (args.length < 1) {
          addOutput('Usage: cat <filename> [content]');
          return;
        }
        if (args.length === 1) {
          displayFile(args[0]);
        } else {
          writeToFile(args[0], args.slice(1).join(' '));
        }
        break;

      case 'ls':
        listFiles();
        break;

      case 'rm':
        if (args.length !== 1) {
          addOutput('Usage: rm <filename>');
          return;
        }
        removeFile(args[0]);
        break;

      case 'cp':
        if (args.length !== 2) {
          addOutput('Usage: cp <source> <destination>');
          return;
        }
        copyFile(args[0], args[1]);
        break;

      case 'help':
        showHelp();
        break;

      default:
        addOutput(`Unknown command: ${cmd}`);
    }
  };

  const createFile = (name: string, type: 'text' | 'image') => {
    if (fileSystem[name]) {
      addOutput(`Error: File ${name} already exists`);
      return;
    }
    setFileSystem(prev => ({
      ...prev,
      [name]: {
        name,
        type,
        content: '',
        size: 0,
        isPasswordProtected: false
      }
    }));
    addOutput(`Created ${type} file: ${name}`);
  };

  const writeToFile = (name: string, content: string) => {
    if (!fileSystem[name]) {
      addOutput(`Error: File ${name} does not exist`);
      return;
    }
    
    const file = fileSystem[name];
    if (file.isPasswordProtected && !password) {
      addOutput('Error: File is password protected');
      return;
    }

    if (file.type === 'image') {
      // Validate image content (should be numbers and X)
      if (!/^[0-9X]+$/.test(content)) {
        addOutput('Error: Invalid image content. Use numbers and X only');
        return;
      }
    }

    setFileSystem(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        content,
        size: content.length
      }
    }));
    addOutput(`Updated file: ${name}`);
  };

  const displayFile = (name: string) => {
    if (!fileSystem[name]) {
      addOutput(`Error: File ${name} does not exist`);
      return;
    }

    const file = fileSystem[name];
    if (file.isPasswordProtected && !password) {
      addOutput('Error: File is password protected');
      return;
    }

    if (file.type === 'image') {
      // Display image content in a grid
      const size = Math.sqrt(file.content.length);
      let display = '';
      for (let i = 0; i < file.content.length; i += size) {
        display += file.content.slice(i, i + size) + '\n';
      }
      addOutput(`File: ${name} (${file.type})`);
      addOutput(display);
    } else {
      addOutput(`File: ${name} (${file.type})`);
      addOutput(file.content || '(empty)');
    }
  };

  const listFiles = () => {
    const files = Object.values(fileSystem);
    if (files.length === 0) {
      addOutput('No files in the system');
      return;
    }
    
    addOutput('Files:');
    files.forEach(file => {
      addOutput(`${file.name} (${file.type}, ${file.size} bytes)${file.isPasswordProtected ? ' 🔒' : ''}`);
    });
  };

  const removeFile = (name: string) => {
    if (!fileSystem[name]) {
      addOutput(`Error: File ${name} does not exist`);
      return;
    }

    const newFileSystem = { ...fileSystem };
    delete newFileSystem[name];
    setFileSystem(newFileSystem);
    addOutput(`Removed file: ${name}`);
  };

  const copyFile = (source: string, dest: string) => {
    if (!fileSystem[source]) {
      addOutput(`Error: Source file ${source} does not exist`);
      return;
    }
    if (fileSystem[dest]) {
      addOutput(`Error: Destination file ${dest} already exists`);
      return;
    }

    setFileSystem(prev => ({
      ...prev,
      [dest]: {
        ...prev[source],
        name: dest
      }
    }));
    addOutput(`Copied ${source} to ${dest}`);
  };

  const showHelp = () => {
    addOutput('Available commands:');
    addOutput('  touch <filename> <type>  - Create a new file (type: text/image)');
    addOutput('  cat <filename> [content] - Display or update file content');
    addOutput('  ls                       - List all files');
    addOutput('  rm <filename>            - Remove a file');
    addOutput('  cp <source> <dest>       - Copy a file');
    addOutput('  help                     - Show this help message');
  };

  const addOutput = (line: string) => {
    setOutput(prev => [...prev, line]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;
    
    addOutput(`> ${currentCommand}`);
    executeCommand(currentCommand);
    setCurrentCommand('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Mock OS File System</h2>
        
        {/* Command Input */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter command (type 'help' for available commands)"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Execute
            </button>
          </div>
        </form>

        {/* Terminal Output */}
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">{line}</div>
          ))}
        </div>

        {/* Optional Password Input */}
        <div className="mt-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password for protected files"
          />
        </div>
      </div>
    </div>
  );
};

export default MockOSVisualizer;
