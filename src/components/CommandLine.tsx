import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandLine: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [workingDirectory, setWorkingDirectory] = useState('/home/user');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<'dark' | 'hacker' | 'retro'>('dark');
  const [showHelp, setShowHelp] = useState(false);
  const [typingEffect, setTypingEffect] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const themeStyles = {
    dark: {
      bg: 'bg-[#121212]',
      terminal: 'bg-[#1E1E1E]',
      header: 'bg-[#252525]',
      input: 'bg-[#1a1a1a]',
      text: 'text-gray-300',
      accent: 'text-cyan-400',
      prompt: 'text-yellow-400',
      border: 'border-gray-700',
      button: 'bg-gray-800 hover:bg-gray-700',
      buttonHover: '#374151'
    },
    hacker: {
      bg: 'bg-black',
      terminal: 'bg-black',
      header: 'bg-[#0a0a0a]',
      input: 'bg-black',
      text: 'text-green-400',
      accent: 'text-green-500',
      prompt: 'text-green-600',
      border: 'border-green-900',
      button: 'bg-green-900/30 hover:bg-green-900/50',
      buttonHover: '#0c3a1c'
    },
    retro: {
      bg: 'bg-[#2b2b4b]',
      terminal: 'bg-[#1a1a3a]',
      header: 'bg-[#252550]',
      input: 'bg-[#151535]',
      text: 'text-amber-300',
      accent: 'text-amber-400',
      prompt: 'text-amber-500',
      border: 'border-indigo-900',
      button: 'bg-indigo-900/30 hover:bg-indigo-900/50',
      buttonHover: '#2d2b6e'
    }
  };

  const style = themeStyles[theme];

  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  ls       - List directory contents',
      '  cd       - Change directory',
      '  cat      - View file contents',
      '  touch    - Create a new file',
      '  rm       - Remove a file',
      '  mkdir    - Create a new directory',
      '  pwd      - Print working directory',
      '  echo     - Print text to terminal',
      '  date     - Display current date and time',
      '  theme    - Change terminal theme (dark, hacker, retro)',
      '  typing   - Toggle typing animation effect',
      '  clear    - Clear the terminal',
    ],
    ls: (args: string) => {
      const files = {
        '/home/user': [
          { name: 'Documents/', type: 'directory', color: `${theme === 'hacker' ? 'text-green-400' : 'text-blue-400'}` },
          { name: 'Pictures/', type: 'directory', color: `${theme === 'hacker' ? 'text-green-400' : 'text-blue-400'}` },
          { name: 'Downloads/', type: 'directory', color: `${theme === 'hacker' ? 'text-green-400' : 'text-blue-400'}` },
          { name: 'example.txt', type: 'file', color: `${theme === 'hacker' ? 'text-green-300' : 'text-green-400'}` },
          { name: 'README.md', type: 'file', color: `${theme === 'hacker' ? 'text-green-300' : 'text-green-400'}` },
        ],
        '/home/user/Documents': [
          { name: 'resume.pdf', type: 'file', color: `${theme === 'hacker' ? 'text-green-300' : 'text-red-400'}` },
          { name: 'notes.txt', type: 'file', color: `${theme === 'hacker' ? 'text-green-300' : 'text-green-400'}` },
          { name: 'Projects/', type: 'directory', color: `${theme === 'hacker' ? 'text-green-400' : 'text-blue-400'}` },
        ],
        '/home/user/Pictures': [
          { name: 'vacation.jpg', type: 'file', color: `${theme === 'hacker' ? 'text-green-300' : 'text-yellow-400'}` },
          { name: 'profile.png', type: 'file', color: `${theme === 'hacker' ? 'text-green-300' : 'text-yellow-400'}` },
        ],
        '/home/user/Downloads': [
          { name: 'software.zip', type: 'file', color: `${theme === 'hacker' ? 'text-green-300' : 'text-purple-400'}` },
        ],
      };

      const path = args ? `${workingDirectory}/${args}`.replace(/\/+/g, '/') : workingDirectory;
      const dirContents = files[path as keyof typeof files];

      if (!dirContents) return [`ls: cannot access '${args}': No such file or directory`];

      return dirContents.map(item => `<span class="${item.color}">${item.name}</span>`);
    },
    cd: (args: string) => {
      if (!args) return ['Current directory: ' + workingDirectory];
      
      if (args === '..') {
        const parts = workingDirectory.split('/').filter(Boolean);
        if (parts.length > 1) {
          parts.pop();
          setWorkingDirectory('/' + parts.join('/'));
        } else {
          setWorkingDirectory('/');
        }
        return [];
      }
      
      const validDirs: Record<string, string[]> = {
        '/home/user': ['Documents', 'Pictures', 'Downloads'],
        '/home/user/Documents': ['Projects'],
        '/home/user/Pictures': [],
        '/home/user/Downloads': [],
      };

      const currentDirContents = validDirs[workingDirectory] || [];
      
      if (currentDirContents.includes(args)) {
        setWorkingDirectory(`${workingDirectory}/${args}`.replace(/\/+/g, '/'));
        return [];
      }

      return [`cd: ${args}: No such directory`];
    },
    cat: (args: string) => {
      if (!args) return ['Usage: cat <filename>'];
      
      const files = {
        'example.txt': 'This is an example text file.\nIt contains multiple lines of text.\nYou can use the cat command to view its contents.',
        'README.md': '# Project README\n\nThis is a markdown file that contains project documentation.',
        'notes.txt': 'Important notes:\n1. Complete the project by Friday\n2. Schedule meeting with team\n3. Update documentation',
      };
      
      const file = files[args as keyof typeof files];
      if (!file) return [`cat: ${args}: No such file`];
      
      return file.split('\n');
    },
    touch: (args: string) => {
      if (!args) return ['Usage: touch <filename>'];
      return [`Created file: ${args}`];
    },
    rm: (args: string) => {
      if (!args) return ['Usage: rm <filename>'];
      return [`Removed file: ${args}`];
    },
    mkdir: (args: string) => {
      if (!args) return ['Usage: mkdir <directory>'];
      return [`Created directory: ${args}`];
    },
    pwd: () => [workingDirectory],
    echo: (args: string) => [args || ''],
    date: () => [new Date().toString()],
    theme: (args: string) => {
      if (args === 'dark' || args === 'hacker' || args === 'retro') {
        setTheme(args);
        return [`Theme changed to ${args}`];
      }
      return ['Usage: theme <dark|hacker|retro>'];
    },
    typing: () => {
      setTypingEffect(!typingEffect);
      return [`Typing effect ${typingEffect ? 'disabled' : 'enabled'}`];
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

    // Add to command history
    setCommandHistory(prev => [...prev, currentCommand]);
    setHistoryIndex(-1);

    const promptStyle = theme === 'hacker' ? 'text-green-500' : 'text-cyan-400';
    const promptCharStyle = theme === 'hacker' ? 'text-green-600' : 'text-yellow-400';

    const newHistory = [
      ...history,
      `<span class="${promptStyle}">${workingDirectory}</span><span class="${promptCharStyle}">$</span> ${currentCommand}`,
      ...executeCommand(currentCommand)
    ];

    setHistory(newHistory);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const commands = ['help', 'ls', 'cd', 'cat', 'touch', 'rm', 'mkdir', 'pwd', 'echo', 'date', 'theme', 'typing', 'clear'];
      const input = currentCommand.trim();
      
      if (input) {
        const matches = commands.filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
          setCurrentCommand(matches[0] + ' ');
        }
      }
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
      `<span class="${theme === 'hacker' ? 'text-green-400' : 'text-green-400'}">Welcome to the Command Line Interface!</span>`,
      `<span class="${theme === 'hacker' ? 'text-green-400' : 'text-green-400'}">Type 'help' for available commands.</span>`,
      `<span class="${theme === 'hacker' ? 'text-green-400' : 'text-green-400'}">Try the 'theme' command to change the terminal appearance.</span>`,
      '',
    ]);
  }, [theme]);

  // Typing animation for the prompt
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={`${style.bg} min-h-screen p-4 pt-20`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${style.accent}`}>Command Line Interface</h1>
          <div className="flex space-x-3">
            <motion.button 
              className="flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-opacity-20 border border-opacity-20"
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 
                               theme === 'hacker' ? 'rgba(16, 185, 129, 0.2)' : 
                               'rgba(217, 119, 6, 0.2)',
                borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 
                           theme === 'hacker' ? 'rgba(16, 185, 129, 0.2)' : 
                           'rgba(217, 119, 6, 0.2)',
                color: theme === 'dark' ? 'rgb(96, 165, 250)' : 
                      theme === 'hacker' ? 'rgb(16, 185, 129)' : 
                      'rgb(251, 191, 36)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHelp(!showHelp)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Help
            </motion.button>
            <div className="flex space-x-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" 
                whileHover={{ scale: 1.2 }} 
                onClick={() => setHistory(prev => [...prev, `<span class="${style.accent}">${workingDirectory}</span><span class="${style.prompt}">$</span> clear`, ''])}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" 
                whileHover={{ scale: 1.2 }} 
                onClick={() => setTheme(theme === 'dark' ? 'hacker' : theme === 'hacker' ? 'retro' : 'dark')}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" 
                whileHover={{ scale: 1.2 }} 
                onClick={() => setTypingEffect(!typingEffect)}
              />
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-4 p-4 rounded-lg ${style.terminal} border ${style.border}`}
            >
              <h3 className={`font-semibold ${style.accent} mb-2`}>Quick Help</h3>
              <ul className={`${style.text} text-sm space-y-1`}>
                <li>• Type <code className="bg-black/30 px-1 rounded">help</code> to see all available commands</li>
                <li>• Use <code className="bg-black/30 px-1 rounded">theme dark|hacker|retro</code> to change the terminal theme</li>
                <li>• Press <code className="bg-black/30 px-1 rounded">Tab</code> to autocomplete commands</li>
                <li>• Use <code className="bg-black/30 px-1 rounded">↑</code> and <code className="bg-black/30 px-1 rounded">↓</code> arrows to navigate command history</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className={`${style.terminal} rounded-lg border ${style.border} shadow-lg overflow-hidden`}
          whileHover={{ boxShadow: theme === 'dark' ? "0 0 15px rgba(138, 75, 175, 0.3)" : 
                                  theme === 'hacker' ? "0 0 15px rgba(16, 185, 129, 0.3)" : 
                                  "0 0 15px rgba(251, 191, 36, 0.3)" }}
        >
          <div className={`${style.header} px-4 py-2 border-b ${style.border} flex justify-between items-center`}>
            <span className={`${style.text} font-medium`}>terminal@martinrivera:~</span>
            <div className="flex space-x-4">
              <motion.button 
                className={`${style.text} hover:${style.accent}`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setHistory(prev => [...prev, `<span class="${style.accent}">${workingDirectory}</span><span class="${style.prompt}">$</span> clear`, ''])}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          <div 
            ref={historyRef}
            className={`h-[500px] overflow-y-auto p-4 font-mono text-sm ${style.text} whitespace-pre-wrap`}
            dangerouslySetInnerHTML={{ 
              __html: history.join('<br />') 
            }}
          />
          
          <div className={`flex items-center ${style.text} px-4 py-3 border-t ${style.border} ${style.input}`}>
            <span className="mr-2">
              <span className={style.accent}>{workingDirectory}</span>
              <span className={style.prompt}>$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent outline-none ${theme === 'hacker' ? 'text-green-300' : 'text-white'}`}
              autoFocus
            />
            <span className={`w-2 h-5 ${showCursor ? 'opacity-100' : 'opacity-0'} ${theme === 'hacker' ? 'bg-green-400' : theme === 'retro' ? 'bg-amber-400' : 'bg-white'} transition-opacity duration-100`}></span>
          </div>
        </motion.div>
        
        <motion.div 
          className={`mt-6 ${style.terminal} rounded-lg p-4 border ${style.border}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={`text-xl font-semibold ${style.accent} mb-3`}>Quick Reference</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.keys(commands).map((cmd) => (
              <motion.button
                key={cmd}
                className={`px-3 py-2 ${style.button} rounded ${style.text} text-sm text-left`}
                whileHover={{ scale: 1.03, backgroundColor: style.buttonHover }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentCommand(cmd);
                  inputRef.current?.focus();
                }}
              >
                {cmd}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CommandLine;
