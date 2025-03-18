import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const projectsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Updated project data - removed specified projects and kept only the ones to keep
  const projects = [
    {
      title: "Snake Game",
      description: "A classic Snake game implemented with modern controls and smooth animations. Features include score tracking, increasing difficulty, and responsive controls.",
      tech: ["JavaScript", "HTML Canvas", "CSS"],
      link: "/snake-game",
      image: "/projects/snake.png",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Pathfinding Visualizer",
      description: "Interactive tool for visualizing various pathfinding algorithms including Dijkstra's, A*, and BFS. Users can create obstacles and see how different algorithms navigate around them.",
      tech: ["React", "TypeScript", "Algorithms"],
      link: "/pathfinding",
      image: "/projects/pathfinder.png",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Tech Store",
      description: "Full-stack e-commerce platform featuring a shopping cart, checkout system, and product catalog. Implements secure payment processing and user authentication.",
      tech: ["React", "Node.js", "MongoDB"],
      link: "/tech-store",
      image: "/projects/techstore.png",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Command Line Interface",
      description: "Unix-like CLI tool that supports basic file system operations. Includes features like file creation, deletion, and directory navigation with a modern interface.",
      tech: ["Python", "OS Module", "ArgParse"],
      link: "/cli",
      image: "/projects/cli.png",
      color: "from-gray-700 to-gray-900"
    }
  ];

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

  // Animate projects on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        const scrollY = window.scrollY;
        const projectsTop = projectsRef.current.offsetTop;
        const projectsHeight = projectsRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollY > projectsTop - windowHeight / 2 && scrollY < projectsTop + projectsHeight) {
          controls.start('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  // Particle effect component
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

  // Card hover effect
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#0a0a0a] to-[#121212] relative overflow-hidden">
      <Particles />
      
      {/* Gradient orbs for background effect */}
      <div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] opacity-30"
        style={{ 
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[120px] opacity-20"
        style={{ 
          transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with animated text */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Projects
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A collection of my work showcasing various technologies and problem-solving approaches
          </motion.p>
        </motion.div>
        
        {/* View mode toggle */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm p-1 rounded-full flex">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid View
              </span>
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setViewMode('list')}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                List View
              </span>
            </button>
          </div>
        </motion.div>

        {/* Projects grid view */}
        {viewMode === 'grid' ? (
          <motion.div 
            ref={projectsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                whileHover="hover"
                className="group relative"
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}></div>
                
                <div className="relative h-full bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-800/50 group-hover:border-gray-700/70 transition-all duration-500 shadow-xl">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  
                  <div className="p-6 h-full flex flex-col">
                    <h2 className={`text-xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-3 group-hover:translate-x-1 transition-transform duration-300`}>
                      {project.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-4 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#2a2a2a]/50 text-sm text-gray-300 rounded-full backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      to={project.link} 
                      className="group/btn inline-flex items-center text-sm font-medium"
                    >
                      <span className={`relative inline-flex overflow-hidden rounded-full px-4 py-2 bg-gradient-to-r ${project.color} bg-opacity-10`}>
                        <span className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-20 group-hover/btn:opacity-40 transition-opacity duration-300`}></span>
                        <span className="relative flex items-center">
                          Explore Project
                          <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-800/50 hover:border-gray-700/70 transition-all duration-300"
              >
                <Link to={project.link} className="block">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-grow">
                        <h2 className={`text-xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-3 group-hover:translate-x-1 transition-transform duration-300`}>
                          {project.title}
                        </h2>
                        <p className="text-gray-400 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-[#2a2a2a]/50 text-sm text-gray-300 rounded-full backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className={`rounded-full p-3 bg-gradient-to-r ${project.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
