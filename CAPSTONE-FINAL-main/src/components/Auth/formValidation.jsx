export const validateForm = (formData, patientDetails) => {
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
  
    if (formData.userType === 'Guardian') {
      const requiredFields = ['patientName', 'patientAge', 'birthdate', 'sex', 'birthplace', 'religion', 'fatherName', 'fatherAge', 'fatherOccupation', 'motherName', 'motherAge', 'motherOccupation', 'cellphone', 'patientEmail', 'informant', 'address', 'relation', 'medicalHistory'];
      for (const field of requiredFields) {
        if (!patientDetails[field]) {
          return `Please fill in all required fields for patient information: ${field}`;
        }
      }
    }
    return null;
  };
  