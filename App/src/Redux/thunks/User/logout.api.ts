import type { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';

interface Request {
  token: string | undefined;
}

interface ResponseData {
  message: string;
}

export const userLogout = createAsyncThunk<ResponseData, Request>(
  'api/logout',
  async ({ token }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/api/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default userLogout;
