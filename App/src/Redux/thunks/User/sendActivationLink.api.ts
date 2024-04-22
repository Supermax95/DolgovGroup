import { createAsyncThunk } from '@reduxjs/toolkit';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

interface Response {
  message: string;
}

interface Request {
  userId?: number | undefined;
  force?: boolean;
}

const sendActivationLink = createAsyncThunk<Response, Request>(
  'api/sendActivationLink',
  async ({ userId }) => {
    try {
      const response: AxiosResponse = await axios.post<AxiosResponse>(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/sendNewActivationLink/${userId}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default sendActivationLink;
