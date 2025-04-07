import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  email: string;
}

interface ResponseData {
  message: string;
}

const resetPassword = createAsyncThunk<ResponseData, RequestData>(
  'api/resetPassword',

  async ({ email }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/portal/resetPassword`,
        { email }
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default resetPassword;
