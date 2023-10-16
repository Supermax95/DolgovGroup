import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const profileChangeEmail = createAsyncThunk(
  'api/profileChangeEmail',
  async ({ userId, newEmail }) => {
    try {
      console.log('=====>', newEmail);
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/email/${userId}`,
        { newEmail }
      );
      console.log('responseresponseresponse --> newEmail', response);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default profileChangeEmail;
