import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestDate {
  managerId: number;
  newEmail: string;
}

interface ResponseData {
  email: string;
  message: string;
}

const changeEmailAdmin = createAsyncThunk<ResponseData, RequestDate>(
  'api/changeEmail',
  async ({ managerId, newEmail }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/profileManager/email`,
        { managerId, newEmail }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response data:', error.response.data.error);
        throw rejectWithValue(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);

export default changeEmailAdmin;
