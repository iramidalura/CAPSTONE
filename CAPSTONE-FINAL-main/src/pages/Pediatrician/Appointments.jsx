import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/appointments';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        if (response.data && Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setError('Failed to fetch appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownVisible(false);
  };

  // Apply sorting and filtering together
  const getFilteredAndSortedAppointments = () => {
    if (!appointments) return [];

    // Apply search filter
    let filtered = appointments.filter((appointment) =>
      appointment.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // appointment.guardian_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.app_id.toString().includes(searchQuery)
    );

    // Apply sorting
    if (sortOption === 'date') {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'name') {
      filtered = filtered.sort((a, b) =>
        a.patient_name.localeCompare(b.patient_name)
      );
    }

    return filtered;
  };

  const filteredAppointments = getFilteredAndSortedAppointments();

  // Log state for debugging
  console.log('Appointments:', appointments);
  console.log('Filtered Appointments:', filteredAppointments);
  console.log('Search Query:', searchQuery);

  return (
    <main className="flex-1 bg-green-100 p-10 h-screen">
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
        />

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

      <div className="bg-white p-5 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-lg text-green-800">Loading appointments...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : filteredAppointments.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left">Appointment ID</th>
                <th className="py-3 px-4 text-left">Patient Name</th>
                {/* <th className="py-3 px-4 text-left">Guardian/Parent</th>  */}
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr
                  key={appointment.app_id}
                  className="border-b hover:bg-green-50"
                >
                  <td className="py-2 px-4">{appointment.app_id}</td>
                  <td className="py-2 px-4">{appointment.patient_name}</td>
                  {/* <td className="py-2 px-4">{appointment.guardian_name}</td>  */}
                  <td className="py-2 px-4">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{appointment.time}</td>
                  <td className="py-2 px-4">{appointment.description}</td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                      <button className="text-yellow-500 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-green-800">No appointments available.</p>
        )}
      </div>
    </main>
  );
};

export default Appointments;
