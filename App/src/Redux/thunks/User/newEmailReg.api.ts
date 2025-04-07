import { createAsyncThunk } from '@reduxjs/toolkit';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

interface Response {
  message: string;
  newEmail: string;
}

interface Request {
  userId?: number | undefined;
  newEmail: string;
}

const newEmailReg = createAsyncThunk<Response, Request>(
  'api/sendActivationLink',
  async ({ userId, newEmail }) => {
    try {
      const response: AxiosResponse = await axios.put<AxiosResponse>(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/newRegEmail`,
        { userId, newEmail }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default newEmailReg;
