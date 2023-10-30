import type { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

interface ResponseData {
  message: string;
}

export const userLogout = createAsyncThunk<ResponseData, void>(
  'api/logout',
  async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `http://${IP}:${PORT}/api/logout`,
        null,
        {
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
