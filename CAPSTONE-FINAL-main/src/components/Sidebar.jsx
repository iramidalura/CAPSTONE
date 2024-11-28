import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMessageSquare } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaNotesMedical, FaRegCalendarAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/kiddie.png';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(0);
    const handleLinkClick = (index) => {
        setActiveLink(index)
    }
  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard", name: "Dashboard", icon: FaNotesMedical },
    { id: 2, path: "/appointments", name: "Appointment", icon: FaRegCalendarAlt },
    { id: 3, path: "/patients", name: "Patients", icon: FaUser },
    { id: 4, path: "/chat", name: "Chat", icon: LuMessageSquare },
    { id: 5, path: "/notifications", name: "Notifications", icon: IoIosNotificationsOutline },
    { id: 6, path: "/profile", name: "Profile", icon: FaUserCircle },
  ];

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-green-800 ">
      {/* Logo Section */}
      <div className="mb-5 bg-white flex justify-center">
        <img src={logo} alt="logo" className="w-28 hidden md:flex" />
        <img src={logo} alt="logo" className="w-8 flex md:hidden" />
      </div>

      {/* Links Section */}
      <ul className="mt-8 space-y-6">
        {SIDEBAR_LINKS.map((link) => (
          <li key={link.id} 
          className={'font-medium rounded-md py-2 px-2 bg-green-600 hover:bg-green-500 hover:text-black ${activeLink === index ? "bg-indigo-500": ""} '}>

            <Link to={link.path} className="flex justify-center md:justify-start items-center md:space-x-5"
                onClick={() => handleLinkClick(index)}>
              <span className="mr-3 text-gray-200"><link.icon /></span>
              <span className="text-sm text-gray-200 hidden md:flex">{link.name}</span>

            </Link>
          </li>
        ))}
      </ul>

      {/* Footer Section */}
      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600">
          <span>?</span> <span className="hidden md:flex">Need Help?</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
