import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default createUser;
