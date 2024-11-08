import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const userName = localStorage.getItem('username');
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo or Branding */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-2xl font-bold text-blue-600">
                SocialApp
              </a>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex md:items-center ml-6 w-full">
              <input
                type="text"
                placeholder="Search..."
                className="block w-full py-2 px-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center space-x-4">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/messages"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Messages
            </a>
            <a
             
              href="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Notifications
            </a>

            {/* Profile Dropdown */}
            {userName ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="User profile"
                  />
                  <span className="hidden md:inline-block text-gray-600">
                    {userName}
                  </span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <a
                      href="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
             ) : ( 
              <button onClick={() => navigate('/loginpage')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600">
                Login
              </button>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
