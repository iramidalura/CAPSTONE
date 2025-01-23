import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('patientName'); // Default sort by Patient Name
  const [sortOrder, setSortOrder] = useState('asc'); // Ascending by default
  const [type, setType] = useState('appointments'); // Default to appointments
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');  // Adjust if you store it elsewhere

        const response = await fetch(`http://localhost:5000/api/pedia-get-patient?type=${type}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Add token to headers
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Unauthorized access');
        }

        const data = await response.json();
        setPatients(data.patients || []);  // Ensure it defaults to an empty array
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, [type]); // Fetch data when the type changes

  // Function to handle sorting
  const sortPatients = (patients) => {
    const sortedPatients = [...patients];
    switch (sortType) {
      case 'patientName':
        sortedPatients.sort((a, b) => a.patientFullName.localeCompare(b.patientFullName));
        break;
      case 'age':
        sortedPatients.sort((a, b) => {
          const ageA = new Date().getFullYear() - new Date(a.dateCreated).getFullYear();
          const ageB = new Date().getFullYear() - new Date(b.dateCreated).getFullYear();
          return ageA - ageB;
        });
        break;
      case 'Sex':
        sortedPatients.sort((a, b) => a.Sex.localeCompare(b.Sex));
        break;
      case 'birthdate':
        sortedPatients.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
        break;
      default:
        break;
    }

    return sortOrder === 'asc' ? sortedPatients : sortedPatients.reverse();
  };

  // Apply search filter
  const filteredPatients = sortPatients(patients).filter((patient) =>
    patient.patientFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.sex.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (PatientId) => {
    if (PatientId) {
      navigate(`/pediatrician/view-patients/${PatientId}`, { state: { type } });
    } else {
      console.error('PatientId is missing');
    }
  };
  
  

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Patients</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
          >
            {sortOrder === 'asc' ? (
              <span className="text-green-500">↑</span>
            ) : (
              <span className="text-green-500">↓</span>
            )}
          </button>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
          >
            <option value="patientName">Patient Name</option>
            <option value="age">Age</option>
            <option value="sex">Sex</option>
            <option value="dateCreated">Date Created</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500 hover:bg-green-50"
          >
            <option value="appointments">Appointments</option>
            <option value="consultations">Consultations</option>
          </select>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">Patient Name</th>
              <th className="py-3 px-4">Sex</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{patient.PatientId}</td>
                  <td className="py-3 px-4">{patient.patientFullName}</td>
                  <td className="py-3 px-4">{patient.Sex}</td>
                  <td className="py-3 px-4">{type === 'appointments' ? 'Appointment' : 'Consultation'}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleView(patient.PatientId)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No patients found.  
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
