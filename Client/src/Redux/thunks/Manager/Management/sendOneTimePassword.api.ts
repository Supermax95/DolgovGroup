import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../../VITE_URL';

interface RequestData {
  managerId: number;
}

interface ResponseData {
  message: string;
  resultPass: {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    phone: string;
    email: string;
    isAdmin: boolean;
  };
}

const sendOneTimePassword = createAsyncThunk<ResponseData, RequestData>(
  'api/sendOneTimePassword',

  async ({ managerId }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/management/oneTimePassword`,
        { managerId }
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

export default sendOneTimePassword;
