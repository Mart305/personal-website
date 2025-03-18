import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './ShortestPathVisualizer.css';

// Node class definition
class Node {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  isPath: boolean;
  previousNode: Node | null;
  // For A* algorithm
  f: number;
  g: number;
  h: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.isStart = false;
    this.isFinish = false;
    this.distance = Infinity;
    this.isVisited = false;
    this.isWall = false;
    this.isPath = false;
    this.previousNode = null;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

// Component for the Shortest Path Visualizer
const ShortestPathVisualizer: React.FC = () => {
  // State variables
  const [grid, setGrid] = useState<Node[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [finishNodeRow, setFinishNodeRow] = useState(10);
  const [finishNodeCol, setFinishNodeCol] = useState(35);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>('dijkstra');
  const [isRunning, setIsRunning] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'wall' | 'eraser'>('wall');
  const [showResults, setShowResults] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const [visitedNodesCount, setVisitedNodesCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Initialize the grid
  const initializeGrid = useCallback(() => {
    const newGrid: Node[][] = [];
    for (let row = 0; row < 20; row++) {
      const currentRow: Node[] = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(new Node(row, col));
      }
      newGrid.push(currentRow);
    }
    
    // Set start and finish nodes
    newGrid[startNodeRow][startNodeCol].isStart = true;
    newGrid[finishNodeRow][finishNodeCol].isFinish = true;
    
    return newGrid;
  }, [startNodeRow, startNodeCol, finishNodeRow, finishNodeCol]);

  // Initialize grid on component mount
  useEffect(() => {
    const grid = initializeGrid();
    setGrid(grid);
  }, [initializeGrid]);

  // Handle mouse down on a node
  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return;
    
    // Create a new grid with the updated node
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    if (node.isStart || node.isFinish) return;
    
    if (selectedTool === 'wall') {
      node.isWall = true;
    } else if (selectedTool === 'eraser') {
      node.isWall = false;
    }
    
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  // Handle mouse enter on a node
  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isRunning) return;
    
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    if (node.isStart || node.isFinish) return;
    
    if (selectedTool === 'wall') {
      node.isWall = true;
    } else if (selectedTool === 'eraser') {
      node.isWall = false;
    }
    
    setGrid(newGrid);
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // Show tooltip on node hover
  const handleNodeHover = (row: number, col: number, event: React.MouseEvent) => {
    const node = grid[row][col];
    let content = '';
    
    if (node.isStart) {
      content = 'Start Node';
    } else if (node.isFinish) {
      content = 'Finish Node';
    } else if (node.isWall) {
      content = 'Wall Node';
    } else if (node.isPath) {
      content = 'Path Node';
    } else if (node.isVisited) {
      content = 'Visited Node';
    } else {
      content = 'Unvisited Node';
    }
    
    setTooltipContent(content);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  // Hide tooltip when not hovering
  const handleNodeLeave = () => {
    setShowTooltip(false);
  };

  // Reset the grid
  const resetGrid = () => {
    setIsResetting(true);
    setShowResults(false);
    
    // Clear all animations
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const nodeId = `node-${row}-${col}`;
        const nodeElement = document.getElementById(nodeId);
        if (nodeElement) {
          nodeElement.className = 'node';
          if (row === startNodeRow && col === startNodeCol) {
            nodeElement.className = 'node node-start';
          }
          if (row === finishNodeRow && col === finishNodeCol) {
            nodeElement.className = 'node node-finish';
          }
        }
      }
    }
    
    // Initialize a fresh grid
    const newGrid = initializeGrid();
    setGrid(newGrid);
    setIsResetting(false);
  };

  // Dijkstra's algorithm implementation
  const dijkstra = (grid: Node[][], startNode: Node, finishNode: Node) => {
    const visitedNodesInOrder: Node[] = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    
    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      
      if (!closestNode) break;
      
      // If we encounter a wall, skip it
      if (closestNode.isWall) continue;
      
      // If the closest node is at a distance of infinity,
      // we are trapped and must stop
      if (closestNode.distance === Infinity) break;
      
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      
      // If we've reached the finish node, we're done
      if (closestNode === finishNode) return visitedNodesInOrder;
      
      // Update all neighbors
      updateUnvisitedNeighbors(closestNode, grid);
    }
    
    return visitedNodesInOrder;
  };

  // A* algorithm implementation
  const astar = (grid: Node[][], startNode: Node, finishNode: Node) => {
    const visitedNodesInOrder: Node[] = [];
    const openSet: Node[] = [];
    const closedSet: Node[] = [];
    
    startNode.g = 0;
    startNode.h = heuristic(startNode, finishNode);
    startNode.f = startNode.g + startNode.h;
    openSet.push(startNode);
    
    while (openSet.length > 0) {
      // Find the node with the lowest f value
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      
      const current = openSet[lowestIndex];
      
      // If we've reached the finish node, we're done
      if (current === finishNode) {
        visitedNodesInOrder.push(...closedSet);
        return visitedNodesInOrder;
      }
      
      // Remove current from openSet and add to closedSet
      openSet.splice(lowestIndex, 1);
      closedSet.push(current);
      current.isVisited = true;
      visitedNodesInOrder.push(current);
      
      // Get all neighbors
      const neighbors = getNeighborsForAStar(current, grid);
      
      for (const neighbor of neighbors) {
        // Skip if neighbor is in closedSet or is a wall
        if (closedSet.includes(neighbor) || neighbor.isWall) continue;
        
        // Calculate tentative g score
        const tempG = current.g + 1;
        
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        
        // If we found a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, finishNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previousNode = current;
        }
      }
    }
    
    // No path found
    return visitedNodesInOrder;
  };

  // Breadth-First Search algorithm implementation
  const bfs = (grid: Node[][], startNode: Node, finishNode: Node) => {
    const visitedNodesInOrder: Node[] = [];
    const queue: Node[] = [];
    
    startNode.isVisited = true;
    queue.push(startNode);
    
    while (queue.length) {
      const currentNode = queue.shift();
      if (!currentNode) break;
      
      visitedNodesInOrder.push(currentNode);
      
      // If we've reached the finish node, we're done
      if (currentNode === finishNode) return visitedNodesInOrder;
      
      // Get all neighbors
      const neighbors = getNeighbors(currentNode, grid);
      
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
          queue.push(neighbor);
        }
      }
    }
    
    return visitedNodesInOrder;
  };

  // Depth-First Search algorithm implementation
  const dfs = (grid: Node[][], startNode: Node, finishNode: Node) => {
    const visitedNodesInOrder: Node[] = [];
    const stack: Node[] = [];
    
    startNode.isVisited = true;
    stack.push(startNode);
    
    while (stack.length) {
      const currentNode = stack.pop();
      if (!currentNode) break;
      
      visitedNodesInOrder.push(currentNode);
      
      // If we've reached the finish node, we're done
      if (currentNode === finishNode) return visitedNodesInOrder;
      
      // Get all neighbors
      const neighbors = getNeighbors(currentNode, grid);
      
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
          stack.push(neighbor);
        }
      }
    }
    
    return visitedNodesInOrder;
  };

  // Greedy Best-First Search algorithm implementation
  const greedyBestFirst = (grid: Node[][], startNode: Node, finishNode: Node) => {
    const visitedNodesInOrder: Node[] = [];
    const openSet: Node[] = [];
    
    startNode.h = heuristic(startNode, finishNode);
    openSet.push(startNode);
    
    while (openSet.length) {
      // Sort by heuristic
      openSet.sort((a, b) => a.h - b.h);
      
      const currentNode = openSet.shift();
      if (!currentNode) break;
      
      // If we encounter a wall, skip it
      if (currentNode.isWall) continue;
      
      // If we've reached the finish node, we're done
      if (currentNode === finishNode) {
        visitedNodesInOrder.push(currentNode);
        return visitedNodesInOrder;
      }
      
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      
      // Get all neighbors
      const neighbors = getNeighbors(currentNode, grid);
      
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
          neighbor.h = heuristic(neighbor, finishNode);
          openSet.push(neighbor);
        }
      }
    }
    
    return visitedNodesInOrder;
  };

  // Manhattan distance heuristic for A* and Greedy Best-First Search
  const heuristic = (a: Node, b: Node) => {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  };

  // Helper function to get neighbors for A* algorithm
  const getNeighborsForAStar = (node: Node, grid: Node[][]) => {
    const neighbors: Node[] = [];
    const { row, col } = node;
    
    // Check if neighbors exist and add them
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    // Filter out walls
    return neighbors.filter(neighbor => !neighbor.isWall);
  };

  // Helper function to get all nodes in the grid
  const getAllNodes = (grid: Node[][]) => {
    const nodes: Node[] = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  // Helper function to sort nodes by distance
  const sortNodesByDistance = (nodes: Node[]) => {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };

  // Helper function to update unvisited neighbors
  const updateUnvisitedNeighbors = (node: Node, grid: Node[][]) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };

  // Helper function to get neighbors of a node
  const getNeighbors = (node: Node, grid: Node[][]) => {
    const neighbors: Node[] = [];
    const { row, col } = node;
    
    // Check if neighbors exist and add them
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    // Filter out visited neighbors and walls
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  };

  // Get the shortest path from the finish node
  const getNodesInShortestPathOrder = (finishNode: Node) => {
    const nodesInShortestPathOrder: Node[] = [];
    let currentNode: Node | null = finishNode;
    
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    
    return nodesInShortestPathOrder;
  };

  // Animate the algorithm
  const animateAlgorithm = (visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // If we've reached the end of the visited nodes, animate the shortest path
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      
      // Animate each node in the visited nodes array
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish) {
          const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
          if (nodeElement) {
            nodeElement.className = 'node node-visited';
          }
        }
      }, 10 * i);
    }
  };

  // Animate the shortest path
  const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
          if (nodeElement) {
            node.isPath = true;
            nodeElement.className = 'node node-path';
          }
        }
        
        // When animation is complete, update state
        if (i === nodesInShortestPathOrder.length - 1) {
          setIsRunning(false);
          setShowResults(true);
          setPathLength(nodesInShortestPathOrder.length - 1); // Subtract 1 to exclude start node
          setVisitedNodesCount(document.querySelectorAll('.node-visited').length);
        }
      }, 50 * i);
    }
  };

  // Visualize the algorithm
  const visualizeAlgorithm = () => {
    if (isRunning || isResetting) return;
    setIsRunning(true);
    setShowResults(false);
    
    // Reset the grid state for a new visualization
    const newGrid = grid.slice();
    for (const row of newGrid) {
      for (const node of row) {
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement && !node.isStart && !node.isFinish && !node.isWall) {
          nodeElement.className = 'node';
        }
        node.distance = Infinity;
        node.isVisited = false;
        node.isPath = false;
        node.previousNode = null;
        node.f = 0;
        node.g = 0;
        node.h = 0;
      }
    }
    
    const startNode = newGrid[startNodeRow][startNodeCol];
    const finishNode = newGrid[finishNodeRow][finishNodeCol];
    
    let visitedNodesInOrder: Node[] = [];
    
    // Choose the algorithm based on user selection
    switch (currentAlgorithm) {
      case 'dijkstra':
        visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
        break;
      case 'astar':
        visitedNodesInOrder = astar(newGrid, startNode, finishNode);
        break;
      case 'bfs':
        visitedNodesInOrder = bfs(newGrid, startNode, finishNode);
        break;
      case 'dfs':
        visitedNodesInOrder = dfs(newGrid, startNode, finishNode);
        break;
      case 'greedy':
        visitedNodesInOrder = greedyBestFirst(newGrid, startNode, finishNode);
        break;
      default:
        visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
        break;
    }
    
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  // Change the current algorithm
  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAlgorithm(e.target.value);
  };

  // Change the selected tool
  const handleToolChange = (tool: 'wall' | 'eraser') => {
    setSelectedTool(tool);
  };

  // Render the component
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Particle background effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500 opacity-20"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 200 - 100],
                x: [0, Math.random() * 200 - 100],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div 
          className="text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent inline-block"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Pathfinding Visualizer
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Visualize how different pathfinding algorithms work to find the shortest path between two points.
            Create walls to add obstacles and see how the algorithm navigates around them.
          </motion.p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="mb-8 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="algorithm-select" className="block text-sm font-medium text-gray-300 mb-2">
                  Algorithm
                </label>
                <select
                  id="algorithm-select"
                  value={currentAlgorithm}
                  onChange={handleAlgorithmChange}
                  disabled={isRunning}
                  className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="dijkstra">Dijkstra's Algorithm</option>
                  <option value="astar">A* Search</option>
                  <option value="bfs">Breadth-First Search</option>
                  <option value="dfs">Depth-First Search</option>
                  <option value="greedy">Greedy Best-First Search</option>
                </select>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-300 mb-2">Tool</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToolChange('wall')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      selectedTool === 'wall'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Wall
                  </button>
                  <button
                    onClick={() => handleToolChange('eraser')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      selectedTool === 'eraser'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Eraser
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <motion.button
                onClick={visualizeAlgorithm}
                disabled={isRunning}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md font-medium text-white shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? 'Visualizing...' : 'Visualize!'}
              </motion.button>
              
              <motion.button
                onClick={resetGrid}
                disabled={isRunning || isResetting}
                className="px-6 py-3 bg-gray-700 rounded-md font-medium text-white shadow-lg hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Grid
              </motion.button>
            </div>
          </div>
          
          {/* Algorithm description */}
          <div className="mt-6 text-gray-300">
            <h3 className="text-lg font-medium mb-2">About {
              currentAlgorithm === 'dijkstra' ? "Dijkstra's Algorithm" : 
              currentAlgorithm === 'astar' ? "A* Search" :
              currentAlgorithm === 'bfs' ? "Breadth-First Search" :
              currentAlgorithm === 'dfs' ? "Depth-First Search" :
              currentAlgorithm === 'greedy' ? "Greedy Best-First Search" :
              currentAlgorithm
            }</h3>
            <p className="text-sm">
              {currentAlgorithm === 'dijkstra' 
                ? "Dijkstra's algorithm is a weighted graph search algorithm that finds the shortest path between nodes. It guarantees the shortest path and works by visiting the nodes with the smallest known distance first."
                : currentAlgorithm === 'astar'
                ? "A* Search is an informed search algorithm that uses a heuristic function to guide its search. It combines Dijkstra's algorithm with a heuristic to efficiently find the shortest path."
                : currentAlgorithm === 'bfs'
                ? "Breadth-First Search explores all neighbor nodes at the present depth before moving to nodes at the next depth level. It guarantees the shortest path in unweighted graphs."
                : currentAlgorithm === 'dfs'
                ? "Depth-First Search explores as far as possible along each branch before backtracking. It does not guarantee the shortest path but is useful for maze generation and solving."
                : currentAlgorithm === 'greedy'
                ? "Greedy Best-First Search always chooses the path that appears closest to the goal based on a heuristic. It's faster than Dijkstra's but doesn't guarantee the shortest path."
                : "Select an algorithm to see its description."
              }
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div 
          className="mb-8 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="grid-container bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-4 rounded-lg overflow-auto">
            {grid.map((row, rowIdx) => (
              <div key={rowIdx} className="grid-row">
                {row.map((node, nodeIdx) => (
                  <motion.div
                    key={nodeIdx}
                    id={`node-${rowIdx}-${nodeIdx}`}
                    className={`node ${node.isFinish ? 'node-finish' : ''} 
                      ${node.isStart ? 'node-start' : ''} 
                      ${node.isWall ? 'node-wall' : ''} 
                      ${node.isVisited && !node.isStart && !node.isFinish ? 'node-visited' : ''}
                      ${node.isPath && !node.isStart && !node.isFinish ? 'node-path' : ''}`}
                    onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                    onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                    onMouseUp={handleMouseUp}
                    onMouseMove={(e) => handleNodeHover(rowIdx, nodeIdx, e)}
                    onMouseLeave={handleNodeLeave}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.01 * (rowIdx + nodeIdx), duration: 0.3 }}
                  ></motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            className="fixed bg-gray-800 text-white text-sm py-1 px-2 rounded-md shadow-lg z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y + 10,
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tooltipContent}
          </motion.div>
        )}

        {/* Results */}
        {showResults && (
          <motion.div
            className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <p className="text-gray-300 mb-1">Path Length:</p>
                <p className="text-2xl font-bold text-yellow-400">{pathLength} nodes</p>
              </div>
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <p className="text-gray-300 mb-1">Nodes Visited:</p>
                <p className="text-2xl font-bold text-purple-400">{visitedNodesCount} nodes</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <motion.div 
          className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex items-center">
              <div className="w-6 h-6 node node-start mr-3"></div>
              <span>Start Node</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 node node-finish mr-3"></div>
              <span>Finish Node</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 node node-wall mr-3"></div>
              <span>Wall Node</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 node node-visited mr-3"></div>
              <span>Visited Node</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 node node-path mr-3"></div>
              <span>Path Node</span>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div 
          className="mt-8 text-gray-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Click and drag to create walls. Use the eraser tool to remove walls. Click "Visualize!" to see the algorithm in action.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ShortestPathVisualizer;