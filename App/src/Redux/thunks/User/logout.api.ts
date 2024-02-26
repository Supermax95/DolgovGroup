import type { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

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
        `http://${IP}:${PORT}/api/logout`,
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
