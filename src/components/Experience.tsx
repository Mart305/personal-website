import React from 'react';

const Experience: React.FC = () => {
  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">Experience</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#121212] border border-[#2D2D2D] rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Professional Experience</h2>
            
            <div className="space-y-4">
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Introduction to Computer Science - Section Lead</h3>
                    <p className="text-gray-300">Washington University in St. Louis</p>
                  </div>
                  <p className="text-gray-300">Aug. 2023-Present</p>
                </div>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>Guided studio sessions of 4-9 students through CSE131 Introduction to Computer Science Java projects</li>
                  <li>Assisted 300+ students individually with Java assignments during office hours and help sessions</li>
                  <li>Promoted to section lead from 100 teaching assistants by the course instructor to ensure efficiency and compliance</li>
                </ul>
              </div>

              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Creative Lab Consultant</h3>
                    <p className="text-gray-300">Arts & Sciences Computing, Washington University in St. Louis</p>
                  </div>
                  <p className="text-gray-300">Aug. 2022-Present</p>
                </div>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>Managed digital tools by optimizing equipment and content selection, improving resource efficiency by 20%</li>
                  <li>Resolved technical issues related to computers, printers, and projectors, reducing downtime by 15%</li>
                  <li>Led equipment recycling and hardware and software upgrades, improving inventory management by 10%</li>
                </ul>
              </div>

              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Student Election Clerk</h3>
                    <p className="text-gray-300">Dallas County, Dallas, TX</p>
                  </div>
                  <p className="text-gray-300">Nov. 2021-Nov. 2021</p>
                </div>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>Checked voter identification and signed in 400 registered voters prior to administering ballots</li>
                  <li>Installed ballot equipment and resolved software and printer errors for a team of 3 election clerks</li>
                </ul>
              </div>

              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Dallas Mayor's Fellows Intern</h3>
                    <p className="text-gray-300">Parkland Hospital, Dallas, TX</p>
                  </div>
                  <p className="text-gray-300">Jun. 2021-Aug. 2021</p>
                </div>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>Managed administrative data using spreadsheet and presentation software to improve data accessibility by 20%</li>
                  <li>Collaborated with medical professionals to streamline patient service processes reducing wait times by 25%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#2D2D2D] rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Leadership Experience</h2>
            
            <div className="space-y-4">
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">President</h3>
                    <p className="text-gray-300">National Honor Society, Barack Obama Male Leadership Academy</p>
                  </div>
                  <p className="text-gray-300">Aug. 2021-May 2022</p>
                </div>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>Facilitated monthly meetings for executive board of 6 and weekly activities for 60+ members</li>
                  <li>Collaborated with 3 student groups to organize campus events that fundraised over $2,000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
