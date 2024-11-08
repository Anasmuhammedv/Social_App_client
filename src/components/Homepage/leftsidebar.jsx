import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <div className="flex items-center space-x-4 mb-6">
        {/* Profile */}
        <img src="profile-picture-url" alt="profile" className="w-12 h-12 rounded-full" />
        <h2 className="text-xl font-bold">Steve Rogers</h2>
      </div>
      
      {/* Navigation */}
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#" className="text-blue-600 hover:underline">Feed</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-blue-600 hover:underline">Friends</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-blue-600 hover:underline">Messages</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-blue-600 hover:underline">Notifications</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
