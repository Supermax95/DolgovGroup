import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  userId: number;
  firstName: string;
  middleName: string;
  email: string;
  userStatus: string;
}

interface ResponseData {
  message: string;
}

const codeSend = createAsyncThunk<ResponseData, RequestData>(
  'admin/nodemailer',

  async ({ userId, firstName, middleName, email, userStatus }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/nodemailer/${userId}`,
        { firstName, middleName, email, userStatus }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default codeSend;

