import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#1E1E1E] border-b border-[#2D2D2D]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white hover:text-purple-400">
              Martin Rivera
            </Link>
          </div>

          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'text-purple-400 bg-[#2D2D2D]' 
                  : 'text-gray-300 hover:text-white hover:bg-[#2D2D2D]'
              }`}
            >
              About
            </Link>

            <Link
              to="/experience"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/experience')
                  ? 'text-purple-400 bg-[#2D2D2D]'
                  : 'text-gray-300 hover:text-white hover:bg-[#2D2D2D]'
              }`}
            >
              Experience
            </Link>

            <Link
              to="/education"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/education')
                  ? 'text-purple-400 bg-[#2D2D2D]'
                  : 'text-gray-300 hover:text-white hover:bg-[#2D2D2D]'
              }`}
            >
              Education
            </Link>

            <Link
              to="/snake"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/snake')
                  ? 'text-purple-400 bg-[#2D2D2D]'
                  : 'text-gray-300 hover:text-white hover:bg-[#2D2D2D]'
              }`}
            >
              Snake Game
            </Link>

            <Link
              to="/pathfinder"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/pathfinder')
                  ? 'text-purple-400 bg-[#2D2D2D]'
                  : 'text-gray-300 hover:text-white hover:bg-[#2D2D2D]'
              }`}
            >
              Pathfinder
            </Link>

            <Link
              to="/cli"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/cli')
                  ? 'text-purple-400 bg-[#2D2D2D]'
                  : 'text-gray-300 hover:text-white hover:bg-[#2D2D2D]'
              }`}
            >
              Command Line
            </Link>

            <Link
              to="/store"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/store')
                  ? 'text-purple-400 bg-[#2D2D2D]'
                  : 'text-gray-300 hover:text-white hover:bg-[#2D2D2D]'
              }`}
            >
              Tech Store
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
