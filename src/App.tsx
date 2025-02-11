import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import SnakeGame from './components/SnakeGame';
import ShortestPathVisualizer from './components/ShortestPathVisualizer';
import CommandLine from './components/CommandLine';
import EcommerceStore from './components/ecommerce/EcommerceStore';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212] text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/snake" element={<SnakeGame />} />
            <Route path="/pathfinder" element={<ShortestPathVisualizer />} />
            <Route path="/cli" element={<CommandLine />} />
            <Route path="/store" element={<EcommerceStore />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
