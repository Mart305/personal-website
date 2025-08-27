import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const About: React.FC = () => {
  // Animation controls for scroll-triggered animations
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Java", "JavaScript", "TypeScript", "Python", "C++", "C#", "HTML/CSS", "SQL", "PHP"]
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React", "React Native", "Node.js", "MongoDB", "MySQL", "AWS", "Unity", "Apache"]
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "GitHub", "Pandas", "Eclipse", "Arduino", "AVR Assembly", "GeoJSON"]
    },
    {
      title: "Languages",
      skills: ["Fluent in Spanish and English"]
    }
  ];

  const projects = [
    {
      title: "Professional Projects",
      items: [
        "ParklandGo - React Native indoor navigation app with GeoJSON mapping and A* pathfinding",
        "Incursion - Interactive game published on itch.io with custom graphics and sound design"
      ]
    },
    {
      title: "Interactive Projects",
      items: [
        "Snake Game - Classic game with modern controls and animations",
        "Pathfinding Visualizer - Interactive tool for visualizing search algorithms",
        "Tech Store - E-commerce platform with shopping cart and checkout",
        "Command Line Interface - Unix-like CLI with file system operations"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-[#121212] to-[#1a1a1a]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.img 
              src="Martin Rivera Headshot.jpg" 
              alt="Martin Rivera"
              className="relative w-64 h-64 object-cover rounded-lg border-2 border-purple-400 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            />
          </div>

          <motion.div
            className="md:pt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Martin Rivera
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-6"></div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-2xl">
              Computer Science student at Washington University in St. Louis with a minor in Finance. Former Teaching Assistant Section Lead for Introduction to Computer Science, where I guided students through Java programming concepts and oversaw 50+ teaching assistants. Recent Software Engineer intern at Parkland Hospital developing React Native navigation applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="mailto:martin.rivera@wustl.edu"
                className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-full text-blue-400 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </motion.a>
              <motion.a 
                href="https://github.com/Mart305"
                className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-full text-purple-400 transition-all duration-300 flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
              <motion.a 
                href="/Martin Rivera Resume.pdf"
                className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-full text-green-400 transition-all duration-300 flex items-center gap-2"
                target="_blank"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/martin-rivera-2239a7204/"
                className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-full text-blue-400 transition-all duration-300 flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-white mb-6 flex items-center"
          >
            <span className="inline-block w-8 h-8 bg-blue-500 rounded-lg mr-3 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Skills & Technologies
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:translate-y-[-5px]"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-[#252525] text-sm text-gray-300 rounded-full border border-gray-700/50 hover:border-blue-500/50 hover:bg-[#2a2a2a] transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-white mb-6 flex items-center"
          >
            <span className="inline-block w-8 h-8 bg-purple-500 rounded-lg mr-3 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </span>
            Projects Overview
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((category, index) => (
              <motion.div 
                key={index}
                className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-purple-900/10 transition-all duration-300 hover:translate-y-[-5px]"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start text-gray-300 group"
                      whileHover={{ x: 5 }}
                    >
                      <svg className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5 group-hover:text-purple-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="group-hover:text-gray-200 transition-colors duration-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.a
              href="/projects"
              className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Projects
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
