import React from 'react';
import './AboutUs.css';  
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)] from-blue-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
    
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 animate-slideInDown">
            About BuyBuddies
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed animate-slideInUp">
            Your trusted destination for quality products, built by passionate CSE students.
          </p>
        </div>


        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12 transition hover:shadow-2xl hover:scale-105 animate-fadeIn">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At BuyBuddies, we're revolutionizing the online shopping experience by creating a platform 
              that connects buyers with quality products seamlessly. As Computer Science and Engineering 
              students, we've combined our technical expertise with a passion for e-commerce to build a 
              platform that makes online shopping better for everyone.
            </p>
          </div>
        </div>

       
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-slideInDown">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rakibul',
                role: 'Full-Stack Developer',
                description:
                  'Bridges frontend and backend development. Implements security features and ensures seamless integration across the platform.',
                color: 'bg-blue-100 text-blue-600',
              },
              {
                name: 'Noman',
                role: 'Backend Developer',
                description:
                  'Specializes in server-side architecture and database management. Ensures smooth data flow and system optimization.',
                color: 'bg-green-100 text-green-600',
              },
              {
                name: 'Abir',
                role: 'Frontend Developer',
                description:
                  'Creates intuitive user interfaces and ensures a seamless shopping experience. Focuses on responsive design and user interaction.',
                color: 'bg-purple-100 text-purple-600',
              },
            ].map((teamMember, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center transition-transform transform hover:scale-105 hover:shadow-2xl animate-bounceIn"
              >
                <div
                  className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${teamMember.color}`}
                >
                  {teamMember.image ? (
                    <img
                      src={teamMember.image}
                      alt={teamMember.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold">{teamMember.name[0]}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{teamMember.name}</h3>
                <p className="text-gray-600 mb-3">{teamMember.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{teamMember.description}</p>
              </div>
            ))}
          </div>
        </div>

     
        <div className="mb-16">
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              As CSE students, we understand the importance of creating technology that serves real-world needs. 
              BuyBuddies is more than just an e-commerce platform – it's our commitment to:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Innovation', description: 'Implementing cutting-edge technology to enhance the shopping experience' },
                { title: 'Security', description: 'Ensuring safe and secure transactions for all users' },
                { title: 'User Experience', description: 'Creating an intuitive and enjoyable shopping platform' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition animate-slideInUp"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-gray-700 mb-6">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <a
            href="mailto:contact@buybuddies.com"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-blue-800"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
