import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

const auth = createAsyncThunk('api/login', async ({ token, userData }) => {
  try {
      console.log('=====>',token)
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        };
        
    const response = await axios.post(
      `http://${IP}:${PORT}/login`,
      userData,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
});

export default auth;
