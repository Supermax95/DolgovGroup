import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
// import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface Request {
  token?: string | undefined;
}

interface Response {
  email: string;
  message: string;
}

const profileCancelEmail = createAsyncThunk<Response, Request>(
  'api/profileCancelEmail',
  async ({ token }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/cancelEmail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default profileCancelEmail;
