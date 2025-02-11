import React, { useState, useCallback } from 'react';
import './ShortestPathVisualizer.css';

interface Node {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: Node | null;
  isPath: boolean;
  f?: number;
  g?: number;
  h?: number;
}

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const createNode = (col: number, row: number): Node => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isPath: false,
  };
};

const getInitialGrid = (): Node[][] => {
  const grid: Node[][] = [];
  for (let row = 0; row < 20; row++) {
    const currentRow: Node[] = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const ShortestPathVisualizer: React.FC = () => {
  const [grid, setGrid] = useState<Node[][]>(getInitialGrid());
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [algorithm, setAlgorithm] = useState<string>('astar');

  const handleMouseDown = (row: number, col: number) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMousePressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const animateAlgorithm = (visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = grid.slice();
        const newNode = {
          ...node,
          isVisited: true,
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const newGrid = grid.slice();
        const newNode = {
          ...node,
          isPath: true,
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 50 * i);
    }
  };

  const visualizeAlgorithm = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder: Node[] = [];
    let nodesInShortestPathOrder: Node[] = [];

    switch (algorithm) {
      case 'astar':
        visitedNodesInOrder = astar(grid, startNode, finishNode);
        break;
      case 'bfs':
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
        break;
      case 'dfs':
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        break;
      default:
        return;
    }

    nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const resetGrid = () => {
    setGrid(getInitialGrid());
  };

  return (
    <div className="bg-[#121212] min-h-screen p-4">
      <div className="bg-[#121212] border border-[#2D2D2D] rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Path Finding Visualizer</h2>
        
        <div className="bg-[#1E1E1E] p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Instructions</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Click and drag on the grid to create walls</li>
            <li>• Select an algorithm from the dropdown</li>
            <li>• Click 'Visualize' to see the algorithm in action</li>
            <li>• Click 'Clear Board' to reset everything</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-[#2D2D2D] text-white px-4 py-2 rounded-md border border-[#2D2D2D] focus:outline-none focus:border-purple-400"
          >
            <option value="astar">A* Search</option>
            <option value="bfs">Breadth-First Search</option>
            <option value="dfs">Depth-First Search</option>
          </select>

          <button
            onClick={visualizeAlgorithm}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Visualize {algorithm.toUpperCase()}
          </button>

          <button
            onClick={resetGrid}
            className="bg-[#2D2D2D] text-white px-4 py-2 rounded-md hover:bg-[#1E1E1E] focus:outline-none"
          >
            Clear Board
          </button>
        </div>
      </div>

      <div className="grid-container bg-[#1E1E1E] p-4 rounded-lg">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => (
              <div
                key={nodeIdx}
                id={`node-${rowIdx}-${nodeIdx}`}
                className={`node ${node.isFinish ? 'node-finish' : ''} 
                  ${node.isStart ? 'node-start' : ''} 
                  ${node.isWall ? 'node-wall' : ''} 
                  ${node.isVisited ? 'node-visited' : ''}
                  ${node.isPath ? 'node-path' : ''}`}
                onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                onMouseUp={handleMouseUp}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Algorithm implementations
const astar = (grid: Node[][], startNode: Node, finishNode: Node): Node[] => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) return visitedNodesInOrder;
    
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === finishNode) return visitedNodesInOrder;
    
    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
  
  return visitedNodesInOrder;
};

const bfs = (grid: Node[][], startNode: Node, finishNode: Node): Node[] => {
  const visitedNodesInOrder: Node[] = [];
  const queue: Node[] = [startNode];
  startNode.distance = 0;
  
  while (queue.length) {
    const currentNode = queue.shift();
    if (!currentNode || currentNode.isWall) continue;
    
    if (currentNode.isVisited) continue;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    
    if (currentNode === finishNode) return visitedNodesInOrder;
    
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }
  
  return visitedNodesInOrder;
};

const dfs = (grid: Node[][], startNode: Node, finishNode: Node): Node[] => {
  const visitedNodesInOrder: Node[] = [];
  const stack: Node[] = [startNode];
  startNode.distance = 0;
  
  while (stack.length) {
    const currentNode = stack.pop();
    if (!currentNode || currentNode.isWall) continue;
    
    if (currentNode.isVisited) continue;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    
    if (currentNode === finishNode) return visitedNodesInOrder;
    
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }
  
  return visitedNodesInOrder;
};

// Helper functions
const getNewGridWithWallToggled = (grid: Node[][], row: number, col: number): Node[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

const getUnvisitedNeighbors = (node: Node, grid: Node[][]): Node[] => {
  const neighbors: Node[] = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

const getAllNodes = (grid: Node[][]): Node[] => {
  const nodes: Node[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (unvisitedNodes: Node[]): void => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node: Node, grid: Node[][], finishNode: Node): void => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const distance = node.distance + 1;
    const heuristic = manhattanDistance(neighbor, finishNode);
    const totalCost = distance + heuristic;
    
    if (totalCost < neighbor.distance) {
      neighbor.distance = totalCost;
      neighbor.previousNode = node;
    }
  }
};

const manhattanDistance = (nodeA: Node, nodeB: Node): number => {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

const getNodesInShortestPathOrder = (finishNode: Node): Node[] => {
  const nodesInShortestPathOrder: Node[] = [];
  let currentNode: Node | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

export default ShortestPathVisualizer;