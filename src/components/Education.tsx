import React from 'react';

const Education: React.FC = () => {
  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">Education</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#121212] border border-[#2D2D2D] rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Washington University in St. Louis</h2>
            <div className="bg-[#1E1E1E] p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">Bachelor of Science in Computer Science, Minor in Finance</h3>
                  <p className="text-gray-300">McKelvey School of Engineering, St. Louis, MO</p>
                </div>
                <p className="text-gray-300">Expected May 2026</p>
              </div>
              <div className="mt-4">
                <h4 className="text-purple-400 font-semibold mb-2">Relevant Coursework</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>Rapid Prototype Development and Creative Programming</li>
                  <li>Analysis of Algorithms</li>
                  <li>Data Structures and Algorithms</li>
                  <li>Data Analytics in Python</li>
                  <li>Capital Markets & Financial Management</li>
                  <li>Advanced Financial Management</li>
                  <li>Investments</li>
                  <li>Video Game Programming</li>
                  <li>Introduction to Artificial Intelligence</li>
                  <li>Programming Tools and Techniques</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#2D2D2D] rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Barack Obama Male Leadership Academy</h2>
            <div className="bg-[#1E1E1E] p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-gray-300">Dallas, TX</p>
                </div>
                <p className="text-gray-300">May 2022</p>
              </div>
              <div className="mt-4">
                <h4 className="text-purple-400 font-semibold mb-2">Awards & Achievements</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>Valedictorian</li>
                  <li>National Honor Society</li>
                  <li>National AP Scholar with Distinction</li>
                  <li>National Hispanic Recognition Scholar</li>
                  <li>Dartmouth Alumni Book Club Award</li>
                  <li>World Affairs Council of Dallas/Fort Worth's 20 Under 20</li>
                  <li>CPR Instruction</li>
                  <li>State Visual Arts Scholastic Event</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
