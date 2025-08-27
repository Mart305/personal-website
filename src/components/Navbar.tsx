import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/education', label: 'Education' },
    { path: '/projects', label: 'Projects' }
  ];

  // Project dropdown items
  const projectItems = [
    { path: 'https://parklandgo.netlify.app', label: 'ParklandGo', external: true },
    { path: 'https://mart305.itch.io/incursion', label: 'Incursion', external: true },
    { path: '/snake-game', label: 'Snake Game' },
    { path: '/pathfinding', label: 'Pathfinding' },
    { path: '/tech-store', label: 'Tech Store' },
    { path: '/cli', label: 'CLI Tool' }
  ];

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.4 
      } 
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#121212]/90 backdrop-blur-md shadow-lg border-b border-gray-800/50' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                M
              </motion.div>
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Martin
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                item.label === 'Projects' ? (
                  <div 
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('projects')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        location.pathname === item.path || projectItems.some(proj => location.pathname === proj.path)
                          ? 'text-blue-400 bg-gray-800'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                      <svg 
                        className={`inline-block ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === 'projects' ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    
                    {activeDropdown === 'projects' && (
                      <motion.div 
                        className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-1">
                          {projectItems.map((project) => (
                            project.external ? (
                              <a
                                key={project.path}
                                href={project.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800 flex items-center"
                              >
                                {project.label}
                                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ) : (
                              <Link
                                key={project.path}
                                to={project.path}
                                className={`block px-4 py-2 text-sm ${
                                  location.pathname === project.path
                                    ? 'text-blue-400 bg-gray-800'
                                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                                }`}
                              >
                                {project.label}
                              </Link>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-blue-400 bg-gray-800'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-800/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/90 backdrop-blur-md rounded-b-lg border-t border-gray-800/50 shadow-lg">
              {navItems.map((item, i) => (
                item.label === 'Projects' ? (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                        location.pathname === item.path || projectItems.some(proj => location.pathname === proj.path)
                          ? 'text-blue-400 bg-gray-800'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                    <div className="pl-4">
                      {projectItems.map((project) => (
                        project.external ? (
                          <a
                            key={project.path}
                            href={project.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800 flex items-center"
                          >
                            {project.label}
                            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <Link
                            key={project.path}
                            to={project.path}
                            className={`block px-3 py-2 text-sm ${
                              location.pathname === project.path
                                ? 'text-blue-400 bg-gray-800'
                                : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                            }`}
                          >
                            {project.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-blue-400 bg-gray-800'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
