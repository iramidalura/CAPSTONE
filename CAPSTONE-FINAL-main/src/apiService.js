import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/'; // Your Django backend URL

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}appointments/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}patients/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};
