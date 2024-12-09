import React from 'react';

const PatientForm = ({ patientDetails, handlePatientChange }) => {
  return (
    <div className="mt-4 w-full">
      <h2 className="text-2xl font-bold text-center mb-2">Register Patient</h2>
      <div className="mb-4">
        <label className="w-full text-left text-sm font-semibold mb-1">Patient Name</label>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={patientDetails.patientName}
          onChange={handlePatientChange}
          className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      {/* Other Patient Form Fields... */}
      <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Patient Age</label>
                  <input
                    type="number"
                    name="patientAge"
                    placeholder="Patient Age"
                    value={patientDetails.patientAge}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Birthdate</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={patientDetails.birthdate}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="w-full text-left text-sm font-semibold mb-1">Sex</label>
                    <select
                      id="sex"
                      name="sex"
                      value={patientDetails.sex}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="w-full text-left text-sm font-semibold mb-1">Birthplace</label>
                    <input
                      type="text"
                      name="birthplace"
                      placeholder="Birthplace"
                      value={patientDetails.birthplace}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Religion</label>
                  <input
                    type="text"
                    name="religion"
                    placeholder="Religion"
                    value={patientDetails.religion}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={patientDetails.address}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="w-full text-left text-sm font-semibold mb-1">Father's Name (Lastname, Firstname, Middle Initial)</label>
                    <input
                      type="text"
                      name="fatherName"
                      placeholder="(Lastname, Firstname, Middle Initial)"
                      value={patientDetails.fatherName}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="w-full text-left text-sm font-semibold mb-1">Father's Age</label>
                    <input
                      type="number"
                      name="fatherAge"
                      placeholder="Father's Age"
                      value={patientDetails.fatherAge}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="w-full text-left text-sm font-semibold mb-1">Father's Occupation</label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      placeholder="Father's Occupation"
                      value={patientDetails.fatherOccupation}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="w-full text-left text-sm font-semibold mb-1">Mother's Name (Lastname, Firstname, Middle Initial)</label>
                    <input
                      type="text"
                      name="motherName"
                      placeholder="(Lastname, Firstname, Middle Initial)"
                      value={patientDetails.motherName}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="w-full text-left text-sm font-semibold mb-1">Mother's Age</label>
                    <input
                      type="number"
                      name="motherAge"
                      placeholder="Mother's Age"
                      value={patientDetails.motherAge}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="w-full text-left text-sm font-semibold mb-1">Mother's Occupation</label>
                    <input
                      type="text"
                      name="motherOccupation"
                      placeholder="Mother's Occupation"
                      value={patientDetails.motherOccupation}
                      onChange={handlePatientChange}
                      className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Cellphone Number(s)</label>
                  <input
                    type="tel"
                    name="cellphone"
                    placeholder="Cellphone Number(s)"
                    value={patientDetails.cellphone}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    name="patientEmail"
                    placeholder="Email Address"
                    value={patientDetails.patientEmail}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Informant</label>
                  <input
                    type="text"
                    name="informant"
                    placeholder="Informant"
                    value={patientDetails.informant}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Relation to Patient</label>
                  <input
                    type="text"
                    name="relation"
                    placeholder="Relation to Patient"
                    value={patientDetails.relation}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="w-full text-left text-sm font-semibold mb-1">Medical History</label>
                  <textarea
                    name="medicalHistory"
                    placeholder="Medical History"
                    value={patientDetails.medicalHistory}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-lg border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    required
                  />
                </div>

    </div>
  );
};

export default PatientForm;
