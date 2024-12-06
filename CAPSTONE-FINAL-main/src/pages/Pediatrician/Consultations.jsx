import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/consultations';

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState(''); // Current sort option
  const [dropdownVisible, setDropdownVisible] = useState(false); // Controls dropdown visibility

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setConsultations(response.data);
      } catch (error) {
        console.error('Failed to fetch consultations:', error);
        setError('Failed to fetch consultations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownVisible(false); // Close dropdown after selection
  };

  // Apply sorting and filtering together
  const getFilteredAndSortedConsultations = () => {
    let filtered = consultations.filter((consultation) =>
      consultation.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.consultation_id.toString().includes(searchQuery)
    );

    if (sortOption === 'date') {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'name') {
      filtered = filtered.sort((a, b) =>
        a.patient_name.localeCompare(b.patient_name)
      );
    }

    return filtered;
  };

  const filteredConsultations = getFilteredAndSortedConsultations();

  return (
    <main className="flex-1 bg-green-100 p-10 h-screen">

      {/* Search and Filter Bar */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
        />

        {/* Filter/Sort Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Filter/Sort
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg border border-gray-200 z-10">
              <button
                onClick={() => handleSortChange('date')}
                className="block px-4 py-2 text-left hover:bg-green-100 w-full"
              >
                Sort by Date
              </button>
              <button
                onClick={() => handleSortChange('name')}
                className="block px-4 py-2 text-left hover:bg-green-100 w-full"
              >
                Sort by Name
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-lg text-green-800">Loading consultations...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : filteredConsultations.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left">Consultation ID</th>
                <th className="py-3 px-4 text-left">Patient Name</th>
                <th className="py-3 px-4 text-left">Guardian/Parent</th> 
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.map((consultation) => {
                // Ensure time is properly formatted (e.g., "8:30" -> "08:30")
                const formattedTime = consultation.time.length === 4 ? `0${consultation.time}` : consultation.time;
                const dateTimeString = `${consultation.date}T${formattedTime}`;

                return (
                  <tr key={consultation.consultation_id} className="border-b hover:bg-green-50">
                    <td className="py-2 px-4">{consultation.consultation_id}</td>
                    <td className="py-2 px-4">{consultation.patient_name}</td>
                    <td className="py-2 px-4">{appointment.guardian_name}</td> 
                    <td className="py-2 px-4">
                      {new Date(consultation.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {/* Create valid Date object for time formatting */}
                      {new Date(dateTimeString).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true, // 12-hour format with AM/PM
                      })}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:underline">View</button>
                        <button className="text-yellow-500 hover:underline">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-green-800">No consultations available.</p>
        )}
      </div>
    </main>
  );
};

export default Consultations;
