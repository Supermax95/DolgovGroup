import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  token: string | undefined;
  newPassword: string;
  oldPassword: string;
}
interface ResponseData {
  message?: string;
}

const changeProfilePass = createAsyncThunk<ResponseData, RequestData>(
  'api/profileChangePass',
  async ({ token, newPassword, oldPassword }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/newpassword`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('response', response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default changeProfilePass;
