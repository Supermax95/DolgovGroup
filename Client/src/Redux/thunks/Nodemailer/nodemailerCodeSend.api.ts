import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  id: number;
  firstName: string;
  middleName: string;
  email: string;
  userStatus: string;
}

interface ResponseData {
  message: string;
}

const nodemailerCodeSend = createAsyncThunk<ResponseData, RequestData>(
  'admin/nodemailerCode',

  async (
    { id, firstName, middleName, email, userStatus },
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/nodemailerCodeSend/${id}`,
        { firstName, middleName, email, userStatus }
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

export default nodemailerCodeSend;
