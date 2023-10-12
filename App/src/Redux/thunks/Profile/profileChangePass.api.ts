import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const changeProfilePass = createAsyncThunk(
  'api/profileChangePass',
  async ({ userId, newPassword, oldPassword }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/newpassword/${userId}`,
        { oldPassword, newPassword }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default changeProfilePass;
