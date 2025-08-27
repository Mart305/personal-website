import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Experience: React.FC = () => {
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

  // Timeline connector styles
  const timelineConnector = "absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 z-0";

  // Experience data
  const professionalExperience = [
    {
      title: "Software Engineer",
      company: "Parkland Hospital, Dallas, TX",
      period: "Jun. 2025 – Aug. 2025",
      responsibilities: [
        "Prototyped a React Native indoor navigation app in TypeScript for a Shark Tank-style pitch to hospital management, demonstrating a tech solution for patient navigation challenges",
        "Engineered GeoJSON mapping system converting CAD floor plans into coordinate-aligned digital maps with sub-meter accuracy",
        "Implemented A* pathfinding algorithms to calculate optimal routes between 15+ departments and POIs"
      ],
      gradient: "from-blue-500 via-cyan-500 to-teal-500"
    },
    {
      title: "IT & Financial Internal Auditor",
      company: "Parkland Hospital, Dallas, TX",
      period: "Jun. 2025 – Aug. 2025",
      responsibilities: [
        "Audited 3,000+ Ethernet ports across hospital facilities, verifying network security and access compliance",
        "Documented noncompliant ports and coordinated with IT to enforce security policy remediation",
        "Analyzed cash management processes, tracking handling, transport, and reconciliation procedures"
      ],
      gradient: "from-cyan-500 via-teal-500 to-green-500"
    },
    {
      title: "Creative Lab Consultant",
      company: "Arts & Sciences Computing, Washington University in St. Louis",
      period: "Aug. 2022-Present",
      responsibilities: [
        "Managed digital tools by optimizing equipment and content selection, improving resource efficiency by 20%",
        "Resolved technical issues related to computers, printers, and projectors, reducing downtime by 15%",
        "Led equipment recycling and hardware and software upgrades, improving inventory management by 10%"
      ],
      gradient: "from-green-500 via-emerald-500 to-teal-500"
    },
    {
      title: "Student Election Clerk",
      company: "Dallas County, Dallas, TX",
      period: "Nov. 2021-Nov. 2021",
      responsibilities: [
        "Checked voter identification and signed in 400 registered voters prior to administering ballots",
        "Installed ballot equipment and resolved software and printer errors for a team of 3 election clerks"
      ],
      gradient: "from-emerald-500 via-cyan-500 to-blue-500"
    },
    {
      title: "Dallas Mayor's Fellows Intern",
      company: "Parkland Hospital, Dallas, TX",
      period: "Jun. 2021-Aug. 2021",
      responsibilities: [
        "Managed administrative data using spreadsheet and presentation software to improve data accessibility by 20%",
        "Collaborated with medical professionals to streamline patient service processes reducing wait times by 25%"
      ],
      gradient: "from-cyan-500 via-purple-500 to-pink-500"
    }
  ];

  const leadershipExperience = [
    {
      title: "President",
      company: "National Honor Society, Barack Obama Male Leadership Academy",
      period: "Aug. 2021-May 2022",
      responsibilities: [
        "Facilitated monthly meetings for executive board of 6 and weekly activities for 60+ members",
        "Collaborated with 3 student groups to organize campus events that fundraised over $2,000"
      ],
      gradient: "from-purple-500 via-pink-500 to-rose-500"
    }
  ];

  // Experience card component
  const ExperienceCard = ({ experience, index, total }: { experience: any, index: number, total: number }) => (
    <motion.div 
      className="group relative"
      custom={index}
      variants={itemVariants}
    >
      {/* Animated gradient background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-r ${experience.gradient} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
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
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${experience.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-xl`}></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <motion.h3 
              className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300"
              whileHover={{ x: 5 }}
            >
              {experience.title}
            </motion.h3>
            <p className={`text-transparent bg-clip-text bg-gradient-to-r ${experience.gradient} font-medium`}>
              {experience.company}
            </p>
          </div>
          <div className="mt-2 md:mt-0 px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-sm border border-gray-700/30 text-gray-300 text-sm font-medium">
            {experience.period}
          </div>
        </div>

        <div className="mt-6">
          <ul className="space-y-3">
            {experience.responsibilities.map((item: string, i: number) => (
              <motion.li 
                key={i}
                className="flex items-start text-gray-300 group/item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="mt-1.5 mr-3 flex-shrink-0">
                  <span className={`block w-2 h-2 rounded-full bg-gradient-to-r ${experience.gradient} group-hover/item:scale-125 transition-all duration-300`}></span>
                </div>
                <span className="group-hover/item:text-gray-200 transition-colors duration-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

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
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional Experience
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded mx-auto mb-6"
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
            My journey through academia and industry
          </motion.p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 gap-12">
          {/* Professional Experience Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="mb-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-8 flex items-center"
            >
              <span className="inline-block w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Professional Experience
            </motion.h2>
            
            <div className="grid grid-cols-1 gap-8">
              {professionalExperience.map((exp, index) => (
                <ExperienceCard 
                  key={index} 
                  experience={exp} 
                  index={index} 
                  total={professionalExperience.length} 
                />
              ))}
            </div>
          </motion.div>

          {/* Leadership Experience Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-8 flex items-center"
            >
              <span className="inline-block w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              Leadership Experience
            </motion.h2>
            
            <div className="grid grid-cols-1 gap-8">
              {leadershipExperience.map((exp, index) => (
                <ExperienceCard 
                  key={index} 
                  experience={exp} 
                  index={index} 
                  total={leadershipExperience.length} 
                />
              ))}
            </div>
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
                className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-lg blur opacity-75"
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
                href="/education"
                className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Education
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
