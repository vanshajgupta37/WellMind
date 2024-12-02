import React, { useState } from 'react';
import { Calendar, Clock, Video, MessageCircle, X } from 'lucide-react';

const MySessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      therapist: 'Dr. Emily Chen',
      date: 'June 15, 2024',
      time: '10:00 AM',
      type: 'Video Call',
      status: 'Upcoming',
      chatRequests: [
        { 
          id: 1, 
          message: 'I would like to discuss my anxiety', 
          timestamp: 'May 20, 2024' 
        }
      ]
    },
    {
      id: 2,
      therapist: 'Dr. Michael Rodriguez',
      date: 'May 22, 2024',
      time: '2:30 PM',
      type: 'In-Person',
      status: 'Completed',
      chatRequests: []
    }
  ]);

  const [selectedSession, setSelectedSession] = useState(null);

  const handleOpenChatRequests = (session) => {
    setSelectedSession(session);
  };

  const handleCloseChatRequests = () => {
    setSelectedSession(null);
  };

  const handleDeleteChatRequest = (sessionId, requestId) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? {
              ...session, 
              chatRequests: session.chatRequests.filter(req => req.id !== requestId)
            }
          : session
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Sessions</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {sessions.map(session => (
          <div 
            key={session.id} 
            className={`relative bg-white shadow rounded-lg p-4 ${
              session.status === 'Upcoming' 
                ? 'border-l-4 border-teal-600' 
                : 'border-l-4 border-gray-400'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{session.therapist}</h3>
              <span className={`
                px-2 py-1 rounded-full text-xs 
                ${session.status === 'Upcoming' 
                  ? 'bg-teal-100 text-teal-800' 
                  : 'bg-gray-100 text-gray-800'
                }
              `}>
                {session.status}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <Calendar className="mr-2 text-gray-500" size={20} />
                {session.date}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-gray-500" size={20} />
                {session.time}
              </div>
              <div className="flex items-center">
                {session.type === 'Video Call' ? (
                  <Video className="mr-2 text-gray-500" size={20} />
                ) : (
                  <MessageCircle className="mr-2 text-gray-500" size={20} />
                )}
                {session.type}
              </div>
            </div>
            
            {/* Chat Requests Section */}
            <div className="mt-4">
              <button 
                onClick={() => handleOpenChatRequests(session)}
                className="w-full bg-blue-50 text-blue-800 py-2 rounded-md hover:bg-blue-100 flex items-center justify-center"
              >
                <MessageCircle className="mr-2" size={20} />
                Chat Requests 
                {session.chatRequests.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {session.chatRequests.length}
                  </span>
                )}
              </button>
            </div>

            {session.status === 'Upcoming' && (
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">
                  Join Session
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100">
                  Reschedule
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Requests Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                Chat Requests - {selectedSession.therapist}
              </h3>
              <button 
                onClick={handleCloseChatRequests}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            {selectedSession.chatRequests.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No chat requests
              </div>
            ) : (
              <div className="divide-y">
                {selectedSession.chatRequests.map(request => (
                  <div 
                    key={request.id} 
                    className="p-4 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium">{request.message}</p>
                      <p className="text-sm text-gray-500">{request.timestamp}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteChatRequest(selectedSession.id, request.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MySessions;