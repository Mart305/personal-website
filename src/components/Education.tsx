import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Define types for education data
interface Course {
  computerScience: string[];
  mathematics: string[];
}

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  courses?: Course;
  achievements?: string[];
  gradient: string;
  csColor?: string;
  mathColor?: string;
  achievementColor?: string;
}

const Education: React.FC = () => {
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
        duration: 0.5
      }
    }
  };

  // Education data
  const educationData: EducationItem[] = [
    {
      school: "Washington University in St. Louis",
      degree: "Bachelor of Science in Computer Science",
      period: "Expected May 2026",
      courses: {
        computerScience: [
          "Data Structures and Algorithms",
          "Object-Oriented Software Development",
          "Introduction to Computer Science",
          "Rapid Prototype Development"
        ],
        mathematics: [
          "Calculus II & III",
          "Matrix Algebra",
          "Probability and Statistics",
          "Discrete Mathematics"
        ]
      },
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      csColor: "blue-400",
      mathColor: "purple-400"
    },
    {
      school: "Barack Obama Male Leadership Academy",
      degree: "High School Diploma",
      period: "May 2022",
      achievements: [
        "Valedictorian",
        "National Honor Society President",
        "AP Scholar with Distinction",
        "Academic Excellence Award"
      ],
      gradient: "from-purple-500 via-pink-500 to-red-500",
      achievementColor: "pink-400"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Education
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My academic journey and qualifications
          </motion.p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {educationData.map((education, index) => (
            <motion.div 
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover="hover"
            >
              {/* Animated gradient background */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${education.gradient} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0, 0.2, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl p-8 border border-gray-800/50 group-hover:border-gray-700/80 transition-all duration-300 shadow-xl">
                {/* Top border gradient */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${education.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-xl`}></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                  <div>
                    <motion.h2 
                      className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {education.school}
                    </motion.h2>
                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${education.gradient} font-medium`}>
                      {education.degree}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-sm border border-gray-700/30 text-gray-300 text-sm font-medium">
                    {education.period}
                  </div>
                </div>

                {index === 0 && education.courses ? (
                  <div className="mt-8">
                    <motion.h3 
                      className={`inline-block text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${education.gradient} mb-6`}
                      whileHover={{ x: 5 }}
                    >
                      Relevant Coursework
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div 
                        className="space-y-4"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className={`text-${education.csColor} font-medium mb-3 flex items-center`}>
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          Computer Science
                        </h4>
                        <ul className="space-y-3">
                          {education.courses.computerScience.map((course, i) => (
                            <motion.li 
                              key={i}
                              className="flex items-center text-gray-300 group/item bg-blue-500/5 px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all duration-300"
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 group-hover/item:scale-125 transition-all duration-300"></span>
                              {course}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      <motion.div 
                        className="space-y-4"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className={`text-${education.mathColor} font-medium mb-3 flex items-center`}>
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          Mathematics
                        </h4>
                        <ul className="space-y-3">
                          {education.courses.mathematics.map((course, i) => (
                            <motion.li 
                              key={i}
                              className="flex items-center text-gray-300 group/item bg-purple-500/5 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition-all duration-300"
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <span className="w-2 h-2 rounded-full bg-purple-500 mr-3 group-hover/item:scale-125 transition-all duration-300"></span>
                              {course}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                ) : education.achievements ? (
                  <div className="mt-8">
                    <motion.h3 
                      className={`inline-block text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${education.gradient} mb-6`}
                      whileHover={{ x: 5 }}
                    >
                      Achievements & Activities
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {education.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm group/item hover:bg-gray-800/50 border border-gray-700/30 hover:border-pink-500/30 transition-all duration-300"
                          whileHover={{ scale: 1.02, x: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <span className={`w-8 h-8 rounded-full bg-${education.achievementColor || 'pink-400'}/20 flex items-center justify-center mr-3`}>
                            <svg className={`w-4 h-4 text-${education.achievementColor || 'pink-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
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
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75"
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
              View My Projects
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
