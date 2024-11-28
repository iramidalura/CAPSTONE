import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex-1 bg-green-100 p-10 h-screen">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Patients</h1>

      {/* Scrollable Table Container */}
      <div className="mt-8 flex-grow overflow-y-auto">
        <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-2 px-4 text-left">Patient ID</th>
              <th className="py-2 px-4 text-left">Patient Name</th>
              <th className="py-2 px-4 text-left">Age</th>
              <th className="py-2 px-4 text-left">Contact Number</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id} className="border-b">
                  <td className="py-2 px-4 text-left">{patient.id}</td>
                  <td className="py-2 px-4 text-left">{patient.name}</td>
                  <td className="py-2 px-4 text-left">{patient.age}</td>
                  <td className="py-2 px-4 text-left">{patient.contact_number}</td>
                  <td className="py-2 px-4 text-left">{patient.email}</td>
                  <td className="py-2 px-4 text-left">{patient.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
