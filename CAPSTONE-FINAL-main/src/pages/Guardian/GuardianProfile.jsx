import React, { useState } from 'react';

const GuardianProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Lessa Mae',
    middleName: 'Caputol',
    lastName: 'Ebarle',
    email: 'ebarlelessa@email.com',
    contactNumber: '09157270949',
    clinicAddress: 'Ace Medical Center, Lapasan, Cagayan de Oro City',
    birthMonth: 'October',
    birthDay: '09',
    birthYear: '2003',
    gender: 'Female',
    nationality: 'Filipino',
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-6">
        <img
          src={profileImage || 'path_to_default_profile_image'}
          alt="Profile"
          className="rounded-full w-32 h-32 object-cover border-2 border-green-600"
        />
        <button
          onClick={toggleEditing}
          className={`mt-4 py-2 px-6 rounded-full ${
            isEditing ? 'bg-green-600' : 'bg-blue-500'
          } text-white hover:bg-opacity-90 transition duration-300`}
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 border border-gray-300 rounded p-2"
          />
        )}
      </div>

      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border p-2 rounded-lg ${
                isEditing ? 'bg-gray-50' : 'bg-transparent'
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold">Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border p-2 rounded-lg ${
                isEditing ? 'bg-gray-50' : 'bg-transparent'
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border p-2 rounded-lg ${
                isEditing ? 'bg-gray-50' : 'bg-transparent'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border p-2 rounded-lg ${
                isEditing ? 'bg-gray-50' : 'bg-transparent'
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold">Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border p-2 rounded-lg ${
                isEditing ? 'bg-gray-50' : 'bg-transparent'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 font-semibold">Clinic Address:</label>
            <input
              type="text"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border p-2 rounded-lg ${
                isEditing ? 'bg-gray-50' : 'bg-transparent'
              }`}
            />
          </div>
          <div>
  <label className="block text-gray-600 font-semibold">Birthday:</label>
  <div className="flex space-x-2">
    <input
      type="text"
      name="birthMonth"
      value={formData.birthMonth}
      onChange={handleInputChange}
      disabled={!isEditing}
      className="border p-2 rounded-lg w-24" // Set width for the month input
    />
    <input
      type="text"
      name="birthDay"
      value={formData.birthDay}
      onChange={handleInputChange}
      disabled={!isEditing}
      className="border p-2 rounded-lg w-16" // Set width for the day input
    />
    <input
      type="text"
      name="birthYear"
      value={formData.birthYear}
      onChange={handleInputChange}
      disabled={!isEditing}
      className="border p-2 rounded-lg w-28" // Set width for the year input
    />
  </div>
</div>

        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold">Gender:</label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
                disabled={!isEditing}
              />{' '}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
                disabled={!isEditing}
              />{' '}
              Female
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 font-semibold">Nationality:</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border p-2 rounded-lg ${
              isEditing ? 'bg-gray-50' : 'bg-transparent'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default GuardianProfile;
