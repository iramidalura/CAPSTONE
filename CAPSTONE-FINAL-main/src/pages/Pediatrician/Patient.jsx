import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
        setError('Failed to fetch patients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownVisible(false); // Close dropdown after selection
  };

  // Filter and sort patients
  const getFilteredAndSortedPatients = () => {
    let filtered = patients.filter((patient) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        patient.name.toLowerCase().includes(searchLower) ||
        patient.email.toLowerCase().includes(searchLower) ||
        patient.contact_number.includes(searchLower) ||
        patient.address.toLowerCase().includes(searchLower)
      );
    });

    if (sortOption === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'age') {
      filtered = filtered.sort((a, b) => a.age - b.age);
    }

    return filtered;
  };

  const filteredPatients = getFilteredAndSortedPatients();

  return (
    <main className="flex-1 bg-green-100 p-10 h-screen">

      {/* Search and Filter Bar */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
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
                onClick={() => handleSortChange('name')}
                className="block px-4 py-2 text-left hover:bg-green-100 w-full"
              >
                Sort by Name
              </button>
              <button
                onClick={() => handleSortChange('age')}
                className="block px-4 py-2 text-left hover:bg-green-100 w-full"
              >
                Sort by Age
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-lg text-green-800">Loading patients...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : filteredPatients.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left">Patient ID</th>
                <th className="py-3 px-4 text-left">Patient Name</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Guardian/Parent</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-green-50">
                  <td className="py-2 px-4">{patient.id}</td>
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.age}</td>
                  <td className="py-2 px-4">{patient.guardian}</td>
                  <td className="py-2 px-4">{patient.email}</td>
                  <td className="py-2 px-4">{patient.address}</td>
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
          <p className="text-lg text-green-800">No patients found.</p>
        )}
      </div>
    </main>
  );
};

export default Patients;
