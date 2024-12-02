import React from 'react';

const Home = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to WellMind
      </h2>
      <p className="text-gray-600 mb-4">
        Your journey to mental wellness starts here. Connect with professional therapists and begin your path to a healthier mind.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-teal-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-teal-800 mb-2">Find Support</h3>
          <p className="text-gray-600">
            Browse and connect with licensed therapists tailored to your needs.
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Book Sessions</h3>
          <p className="text-gray-600">
            Schedule convenient online or in-person therapy sessions.
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Monitor your mental health journey and personal growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;