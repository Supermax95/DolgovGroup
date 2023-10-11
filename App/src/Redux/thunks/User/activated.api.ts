import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

const checkActivation = createAsyncThunk('api/activate', async (userId) => {
  try {
    const response = await axios.get(`http://${IP}:${PORT}/check/${userId}`);
    return response.status === 200;
  } 
  catch (error) {
    return false;
  }
});

export default checkActivation;
