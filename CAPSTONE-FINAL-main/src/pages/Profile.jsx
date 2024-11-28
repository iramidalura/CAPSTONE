import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const HandleLogout = () => {
    navigate('/WelcomePage');
  };

  return (
    <main className="flex-1 bg-green-100 p-10 h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-900">Profile</h1>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Logs */}
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-600">
          <h3 className="font-semibold text-lg text-green-900">Activity Logs</h3>
          <p className="mt-2 text-gray-700">View your recent activities and actions.</p>
          <Link to="/activity-log">
            <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-300">
              Go to Activity Log
            </button>
          </Link>
        </div>

        {/* Settings */}
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-600">
          <h3 className="font-semibold text-lg text-green-900">Settings</h3>
          <p className="mt-2 text-gray-700">Manage your profile settings and preferences.</p>
          <Link to="/settings">
            <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-300">
              Go to Settings
            </button>
          </Link>
        </div>

        {/* About Us */}
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-600">
          <h3 className="font-semibold text-lg text-green-900">About Us</h3>
          <p className="mt-2 text-gray-700">Learn more about KiddieCare.</p>
          <Link to="/about-us">
          <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-300">
              Go to About Us
            </button>
          </Link>
        </div>

        {/* Logout */}
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-600">
          <h3 className="font-semibold text-lg text-green-900">Logout</h3>
          <button
            type='submit'
            onClick={HandleLogout}
            className="mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-300">
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
