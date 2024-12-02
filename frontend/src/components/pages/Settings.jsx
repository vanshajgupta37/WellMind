import React, { useState } from 'react';
import { User, Lock, Bell, Palette, Shield } from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    notifications: true,
    theme: 'light'
  });

  const handleToggleNotification = () => {
    setProfile(prev => ({
      ...prev,
      notifications: !prev.notifications
    }));
  };

  const handleThemeChange = (theme) => {
    setProfile(prev => ({
      ...prev,
      theme: theme
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="mr-3 text-teal-600" size={24} />
            <h3 className="text-lg font-semibold">Profile Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                value={profile.name}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                value={profile.email}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Palette className="mr-3 text-teal-600" size={24} />
            <h3 className="text-lg font-semibold">Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Bell className="mr-3 text-gray-500" size={20} />
                <span>Notifications</span>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={profile.notifications}
                  onChange={handleToggleNotification}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Palette className="mr-3 text-gray-500" size={20} />
                <span>Theme</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  className={`px-4 py-2 rounded-md ${
                    profile.theme === 'light' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${
                    profile.theme === 'dark' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="mr-3 text-teal-600" size={24} />
            <h3 className="text-lg font-semibold">Security</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">
              Change Password
            </button>
            <div className="flex items-center text-gray-600">
              <Shield className="mr-3" size={20} />
              Two-Factor Authentication
              <span className="ml-auto text-red-500">Not Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;