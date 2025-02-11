import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <img 
            src="image0.jpeg" 
            alt="Martin Rivera"
            className="w-64 h-64 object-cover rounded-lg border-2 border-purple-400"
          />
          <div>
            <h1 className="text-3xl font-bold text-purple-400 mb-4">Martin Rivera</h1>
            <p className="text-gray-300 mb-4">
              Computer Science student at Washington University in St. Louis with a focus on software development
              and financial technology. Currently serving as a Section Lead for Introduction to Computer Science,
              where I guide students through Java programming concepts and best practices.
            </p>
            <div className="flex gap-4">
              <a 
                href="mailto:martin.rivera@wustl.edu"
                className="text-purple-400 hover:text-purple-300"
              >
                martin.rivera@wustl.edu
              </a>
              <a 
                href="https://www.linkedin.com/in/martin-rivera-2239a7204/"
                className="text-purple-400 hover:text-purple-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#121212] border border-[#2D2D2D] rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Skills & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Programming Languages</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>Java</li>
                  <li>C/C++</li>
                  <li>Python</li>
                  <li>HTML/CSS</li>
                  <li>JavaScript</li>
                  <li>PHP</li>
                  <li>MySQL</li>
                  <li>React</li>
                  <li>AWS</li>
                  <li>Apache</li>
                  <li>MongoDB</li>
                  <li>Node.js</li>
                  <li>AVR Assembly</li>
                </ul>
              </div>
              
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Tools & Technologies</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>Pandas</li>
                  <li>NumPy</li>
                  <li>Microsoft Office Suite</li>
                  <li>Adobe Creative Suite</li>
                  <li>Tableau</li>
                  <li>Git</li>
                </ul>
                <h3 className="text-lg font-semibold text-purple-400 mt-4 mb-2">Languages</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>Fluent in Spanish and English</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#2D2D2D] rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Projects Overview</h2>
            <div className="space-y-4">
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Interactive Projects</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>Snake Game - Classic game with modern controls and animations</li>
                  <li>Pathfinding Visualizer - Interactive tool for visualizing search algorithms</li>
                  <li>Tech Store - E-commerce platform with shopping cart and checkout</li>
                  <li>Command Line Interface - Unix-like CLI with file system operations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
