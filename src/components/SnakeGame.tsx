import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import './SnakeGame.css';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: 15, y: 10 };
const GAME_SPEED = 150;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(true);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setIsGameOver(false);
    setIsPaused(true);
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
  };

  const checkCollision = (head: Position): boolean => {
    return (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (checkCollision(head)) {
      setIsGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(prevScore => prevScore + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Always prevent default for arrow keys and space to avoid page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ') {
        if (isGameOver) {
          resetGame();
        } else {
          setIsPaused(!isPaused);
        }
      } else if (!isPaused && !isGameOver) {
        const newDirection = (() => {
          switch (e.key) {
            case 'ArrowUp':
              return direction.y === 1 ? direction : { x: 0, y: -1 };
            case 'ArrowDown':
              return direction.y === -1 ? direction : { x: 0, y: 1 };
            case 'ArrowLeft':
              return direction.x === 1 ? direction : { x: -1, y: 0 };
            case 'ArrowRight':
              return direction.x === -1 ? direction : { x: 1, y: 0 };
            default:
              return direction;
          }
        })();
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPaused, isGameOver]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  // Virtual control buttons for mobile
  const handleVirtualControl = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (isPaused || isGameOver) return;
    
    switch (dir) {
      case 'up':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'down':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'left':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'right':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
    }
  };

  // Particle effect component
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 2 + 0.5,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="snake-game-container">
      <Particles />
      
      {/* Gradient orbs for background effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-600 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-600 opacity-10 blur-3xl"></div>
      
      <div className="snake-game-wrapper">
        <motion.h1 
          className="snake-game-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Snake Game
        </motion.h1>
        
        <motion.p 
          className="snake-game-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Control the snake with arrow keys. Eat food to grow longer, but don't hit the walls or yourself!
        </motion.p>
        
        <motion.div 
          className="snake-game-area"
          ref={gameAreaRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            transform: mousePosition.x && gameAreaRef.current ? 
              `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) / 100}deg) rotateX(${(window.innerHeight / 2 - mousePosition.y) / 100}deg)` : 
              'perspective(1000px) rotateY(0deg) rotateX(0deg)',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div className="snake-game-grid">
            {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
              Array.from({ length: GRID_SIZE }).map((_, colIndex) => {
                const isSnakeHead = snake[0].x === colIndex && snake[0].y === rowIndex;
                const isSnakeBody = snake.slice(1).some(segment => segment.x === colIndex && segment.y === rowIndex);
                const isFood = food.x === colIndex && food.y === rowIndex;
                
                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    className={`snake-cell ${isSnakeHead ? 'snake-cell-head' : ''} ${isSnakeBody ? 'snake-cell-body' : ''} ${isFood ? 'snake-cell-food' : ''} ${!isSnakeHead && !isSnakeBody && !isFood ? 'snake-cell-empty' : ''}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.01 * (rowIndex + colIndex),
                      duration: 0.2 
                    }}
                  />
                );
              })
            ))}
          </div>
          
          {(isGameOver || isPaused) && (
            <motion.div 
              className="snake-game-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="snake-game-message-title">
                {isGameOver ? 'Game Over!' : 'Paused'}
              </h2>
              <p className="snake-game-message-text">
                {isGameOver ? `Your score: ${score}` : 'Press Space to continue'}
              </p>
              <button 
                className="snake-game-button primary"
                onClick={isGameOver ? resetGame : () => setIsPaused(false)}
              >
                {isGameOver ? 'Play Again' : 'Resume'}
              </button>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className="snake-game-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="snake-game-score-board">
            <div className="snake-game-score-container">
              <div className="snake-game-score-label">Score</div>
              <div className="snake-game-score-value current">{score}</div>
            </div>
            <div className="snake-game-score-container">
              <div className="snake-game-score-label">High Score</div>
              <div className="snake-game-score-value high">{highScore}</div>
            </div>
          </div>
          
          <div className="snake-game-buttons">
            <motion.button 
              className="snake-game-button primary"
              onClick={() => {
                if (isGameOver) {
                  resetGame();
                } else {
                  setIsPaused(!isPaused);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isGameOver ? 'New Game' : isPaused ? 'Start Game' : 'Pause Game'}
            </motion.button>
            
            <motion.button 
              className="snake-game-button"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
            
            <motion.button 
              className="snake-game-button"
              onClick={() => setShowControls(!showControls)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showControls ? 'Hide Controls' : 'Show Controls'}
            </motion.button>
          </div>
          
          {showControls && (
            <motion.div 
              className="snake-game-virtual-controls"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="snake-game-virtual-button up"
                onClick={() => handleVirtualControl('up')}
              >
                ↑
              </button>
              <button 
                className="snake-game-virtual-button left"
                onClick={() => handleVirtualControl('left')}
              >
                ←
              </button>
              <button 
                className="snake-game-virtual-button right"
                onClick={() => handleVirtualControl('right')}
              >
                →
              </button>
              <button 
                className="snake-game-virtual-button down"
                onClick={() => handleVirtualControl('down')}
              >
                ↓
              </button>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className="snake-game-instructions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p>Use <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> to move the snake. Press <kbd>Space</kbd> to pause/resume.</p>
          <p>Mobile users can use the on-screen controls above.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SnakeGame;
