import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';



const userLogin = createAsyncThunk('api/login', async ({ token, userData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response: AxiosResponse = await axios.post(
      `http://${IP}:${PORT}/api/login`,
      userData,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
});

export default userLogin;
