import React, { useState, useEffect, useCallback } from 'react';

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
      if (e.key === ' ') {
        if (isGameOver) {
          resetGame();
        } else {
          setIsPaused(!isPaused);
        }
        e.preventDefault();
      } else if (!isPaused && !isGameOver) {
        const newDirection = (() => {
          switch (e.key) {
            case 'ArrowUp':
              e.preventDefault();
              return direction.y === 1 ? direction : { x: 0, y: -1 };
            case 'ArrowDown':
              e.preventDefault();
              return direction.y === -1 ? direction : { x: 0, y: 1 };
            case 'ArrowLeft':
              e.preventDefault();
              return direction.x === 1 ? direction : { x: -1, y: 0 };
            case 'ArrowRight':
              e.preventDefault();
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

  return (
    <div className="bg-[#121212] min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Snake Game</h2>
          <div className="text-gray-300 space-y-2 mb-4">
            <p>• Use arrow keys to control the snake</p>
            <p>• Press spacebar to start/pause</p>
            <p>• Collect food to grow and increase your score</p>
          </div>
          <div className="flex justify-between items-center text-white mb-4">
            <div className="text-lg">Score: {score}</div>
            <div className="text-lg">
              {isGameOver ? 'Game Over!' : isPaused ? 'Press Space to Start' : 'Playing'}
            </div>
          </div>
        </div>

        <div 
          className="bg-black rounded-lg p-4"
          style={{
            width: GRID_SIZE * CELL_SIZE + 32,
            height: GRID_SIZE * CELL_SIZE + 32,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              margin: '0 auto',
            }}
          >
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute bg-purple-500"
                style={{
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  borderRadius: '2px',
                }}
              />
            ))}
            <div
              className="absolute bg-red-500"
              style={{
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
