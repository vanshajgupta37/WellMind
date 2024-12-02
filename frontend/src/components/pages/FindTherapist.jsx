import React, { useState } from 'react';
import { Search, Filter, MessageCircle } from 'lucide-react';

const FindTherapist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    language: '',
    availability: ''
  });

  const [chatRequests, setChatRequests] = useState({});

  const therapists = [
    { 
      id: 1, 
      name: 'Dr. Emily Chen', 
      specialization: 'Anxiety', 
      language: 'English', 
      rating: 4.8,
      bio: 'Experienced therapist specializing in anxiety and stress management with 10 years of clinical experience.'
    },
    { 
      id: 2, 
      name: 'Dr. Michael Rodriguez', 
      specialization: 'Depression', 
      language: 'Spanish', 
      rating: 4.6,
      bio: 'Compassionate counselor focusing on depression and emotional wellness.'
    },
    { 
      id: 3, 
      name: 'Dr. Sarah Kim', 
      specialization: 'Relationship Counseling', 
      language: 'English', 
      rating: 4.9,
      bio: 'Expert in relationship dynamics and couples therapy with a holistic approach.'
    }
  ];

  const handleChatRequest = (therapistId) => {
    setChatRequests(prev => ({
      ...prev,
      [therapistId]: prev[therapistId] 
        ? prev[therapistId] + 1 
        : 1
    }));
  };

  const filteredTherapists = therapists.filter(therapist => 
    therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.specialization ? therapist.specialization === filters.specialization : true) &&
    (filters.language ? therapist.language === filters.language : true)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Find a Therapist</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search therapists" 
              className="pl-10 pr-4 py-2 border rounded-md w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-md flex items-center">
            <Filter className="mr-2" size={20} />
            Filters
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTherapists.map(therapist => (
          <div 
            key={therapist.id} 
            className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{therapist.name}</h3>
              <span className="text-yellow-500">★ {therapist.rating}</span>
            </div>
            <div className="space-y-2 text-gray-600 mb-4">
              <p><strong>Specialization:</strong> {therapist.specialization}</p>
              <p><strong>Language:</strong> {therapist.language}</p>
              <p className="text-sm italic">{therapist.bio}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleChatRequest(therapist.id)}
                className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 flex items-center justify-center"
              >
                <MessageCircle className="mr-2" size={20} />
                Request Chat
                {chatRequests[therapist.id] && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {chatRequests[therapist.id]}
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTherapist;