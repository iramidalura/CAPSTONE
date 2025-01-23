import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuMessageSquare } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaNotesMedical, FaRegCalendarAlt, FaUser, FaUserCircle, FaClipboard  } from 'react-icons/fa';
import { FaUserMd } from 'react-icons/fa'; // For Users (Doctors)
import logo from '../../assets/KiddieCare-Logo.png';

const PediatricianSidebar = () => {
  const [activeLink, setActiveLink] = useState(0); // Default to dashboard (or another default page)
  const [settingsVisible, setSettingsVisible] = useState(false); // State to control visibility of settings dropdown
  const navigate = useNavigate(); // Hook to handle navigation

  const SIDEBAR_LINKS = [
    { id: 1, path: "/pediatrician/dashboard", name: "Dashboard", icon: FaNotesMedical },
    { id: 2, path: "/pediatrician/appointments", name: "Appointments", icon: FaRegCalendarAlt },
    { id: 3, path: "/pediatrician/consultations", name: "Consultations", icon: FaRegCalendarAlt },
    { id: 4, path: "/pediatrician/chat", name: "Chat", icon: LuMessageSquare },
    { id: 5, path: "/pediatrician/prescriptions", name: "Prescriptions", icon: FaUserCircle },
    { id: 6, path: "/pediatrician/patients", name: "Patients", icon: FaUser },
    { id: 7, path: "/pediatrician/medical-records", name: "Medical Records", icon: FaClipboard },
    { id: 8, path: "/pediatrician/profile", name: "Profile", icon: FaUserCircle },
  ];

  useEffect(() => {
    // Check if there's a stored active link in localStorage
    const savedActiveLink = localStorage.getItem('activeLink');
    if (savedActiveLink) {
      setActiveLink(parseInt(savedActiveLink));
    }
  }, []);

  const handleLinkClick = (id) => {
    setActiveLink(id);
    localStorage.setItem('activeLink', id); // Save the active link in localStorage
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible); // Toggle visibility of settings dropdown
  };

  // Handle "About Us" navigation
  const navigateToAboutUs = () => {
    navigate('/pediatrician/about-us');
  };

  // Handle "Logout" functionality
  const handleLogout = () => {
    // Remove the token (or any other authentication data)
    localStorage.removeItem('token');
    // Navigate to the logout page or home
    navigate('/');
  };

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-green-800 flex flex-col">
      {/* Logo Section */}
      <div className="bg-white flex justify-center">
        <img src={logo} alt="logo" className="w-28 hidden md:flex" />
        <img src={logo} alt="logo" className="w-8 flex md:hidden" />
      </div>

      {/* Links Section */}
      <ul className="mt-5 space-y-2">
        {SIDEBAR_LINKS.map((link, index) => (
          <li key={link.id} className={`font-medium rounded-md py-2 px-2 bg-green-600 hover:bg-green-500 hover:text-black ${activeLink === index ? "bg-indigo-500" : ""}`}>
            <Link to={link.path} className="flex justify-center md:justify-start items-center md:space-x-5"
                onClick={() => handleLinkClick(index)}>
              <span className="mr-3 text-gray-200"><link.icon /></span>
              <span className="text-sm text-gray-200 hidden md:flex">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer Section - Settings */}
      <div className="w-full mt-auto relative mb-5">
        <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 cursor-pointer" onClick={toggleSettings}>
          <span>⚙️</span> <span className="hidden md:flex">Settings</span>
        </p>

        {/* Settings Dropdown - Appears above the "Settings" button */}
        <div className={`transition-all duration-300 ease-in-out ${settingsVisible ? 'h-auto mt-2 mb-3' : 'h-0 overflow-hidden'} absolute bottom-full left-0 w-full space-y-2`}>
          <p className="text-xs text-white py-2 px-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 cursor-pointer" onClick={navigateToAboutUs}>About Us</p>
          <p className="text-xs text-white py-2 px-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 cursor-pointer">Need Help?</p>
          <p className="text-xs text-white py-2 px-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 cursor-pointer" onClick={handleLogout}>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default PediatricianSidebar;
