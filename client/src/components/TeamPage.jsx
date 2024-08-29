import React from 'react';
import Photo from './Placeholder.jpg';
const teamData = {
  developers: [
    {
      name: 'Shailendra Ruhela',
      role: 'Full-stack developer',
      photo: {Photo},
      description: 'Specializes in React, modern JavaScript frameworks ,server-side logic and database management.'
    },
    {
      name: 'Yash Raj',
      role: 'Full-stack developer',
      photo: 'https://via.placeholder.com/150',
      description: 'Specializes in React, modern JavaScript frameworks ,server-side logic and database management.'
    }
  ],
  mlEngineers: [
    {
      name: 'Ujjwal Tiwari',
      role: 'AI/ML',
      photo: 'https://via.placeholder.com/150',
      description: 'Machine Learning'
    },
    {
      name: 'Aditya Sarkar',
      role: 'AI/ML',
      photo: 'https://via.placeholder.com/150',
      description: 'Machine Learning'
    },
    {
      name: 'Seloni Sinha',
      role: 'AI/ML',
      photo: 'https://via.placeholder.com/150',
      description: 'Machine Learning'
    }
  ],
  uiUx: [
    {
      name: 'Priyanshu Katariya',
      role: 'UI/UX Designer',
      photo: 'https://via.placeholder.com/150',
      description: 'Designs user-friendly interfaces and enhances user experience.'
    }
  ]
};

export function TeamPage() {
  return (
    <div className="max-w-7xl mx-auto bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h1>

      {/* Main grid container for two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column: Developers and UI/UX Designer */}
        <div className="space-y-12">
          {/* Developers Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Developers</h2>
            <div className="space-y-6">
              {teamData.developers.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={Photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                    <p className="text-gray-500">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UI/UX Designer Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">UI/UX Designer</h2>
            <div className="space-y-6">
              {teamData.uiUx.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={Photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                    <p className="text-gray-500">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: ML Engineers */}
        <div className="space-y-12">
          {/* ML Engineers Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Machine Learning Engineers</h2>
            <div className="space-y-6">
              {teamData.mlEngineers.map((member, index) => (
                <div key={index} className="flex items-center p-2.5 space-x-4">
                  <img
                    src={Photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                    <p className="text-gray-500">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TeamPage;
