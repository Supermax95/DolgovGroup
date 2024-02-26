import { createAsyncThunk } from '@reduxjs/toolkit';
import { PORT, IP } from '@env';
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
        `http://${IP}:${PORT}/sendNewActivationLink/${userId}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default sendActivationLink;
