import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const profileChangeFullName = createAsyncThunk(
  'api/profileChangeFullName',
  async ({ userId, newLastName, newFirstName, newMiddleName }) => {
    try {
      console.log('=====>', newLastName, newFirstName, newMiddleName);
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/fullname/${userId}`,
        { newLastName, newFirstName, newMiddleName }
      );
      console.log(
        'responseresponseresponse --> newLastName, newFirstName, newMiddleName',
        response
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default profileChangeFullName;