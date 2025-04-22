import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => [];

export const createUser = async (userData) => {
  console.log(API_URL);
  console.log(userData);
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, newData) => {
  console.log(userId, newData);
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, newData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  console.log(userId);
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
