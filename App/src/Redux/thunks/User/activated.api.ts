import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

const checkActivation = createAsyncThunk(
  'api/activate',
  async ({ userId, token }) => {
    console.log('userId axios', userId);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(
        `http://${IP}:${PORT}/check/${userId}`,
        config
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
);

export default checkActivation;
