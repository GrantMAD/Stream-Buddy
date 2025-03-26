import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-min-h-screen pt-20 pb-10 pr-10 md:pr-20 lg:pr-60 pl-10 md:pl-20 lg:pl-60">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600 mt-2">Learn more about our mission, vision, and the team behind Stream Buddy</p>
      </div>

      {/* Introduction Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-lg text-gray-700">
          Stream Buddy was created to help users organize, share, and discover streaming content. Our goal is to make streaming a more social and personalized experience, allowing you to stay connected with your friends while enjoying your favorite content.
        </p>
      </div>

      {/* Mission Statement Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Our mission is simple: to create a seamless platform that allows users to share their streaming experiences, follow their friends, and discover new content all in one place. We believe in the power of community and the joy of discovering something new together.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold mx-auto mb-4">
              A
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Alice Johnson</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold mx-auto mb-4">
              B
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Bob Smith</h3>
            <p className="text-gray-600">Co-Founder & CTO</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold mx-auto mb-4">
              C
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Carla White</h3>
            <p className="text-gray-600">Lead Designer</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-4">
          Have any questions or suggestions? We’d love to hear from you!
        </p>
        <a
          href="mailto:contact@streambuddy.com"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
