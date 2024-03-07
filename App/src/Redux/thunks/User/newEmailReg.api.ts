import { createAsyncThunk } from '@reduxjs/toolkit';
import { PORT, IP } from '@env';
import axios, { AxiosResponse } from 'axios';

interface Response {
  message: string;
}

interface Request {
  userId: number;
  newEmail: string;
}

const newEmailReg = createAsyncThunk<Response, Request>(
  'api/sendActivationLink',
  async ({ userId, newEmail }) => {
    try {
      const response: AxiosResponse = await axios.put<AxiosResponse>(
        `http://${IP}:${PORT}/newRegEmail`,
        { userId, newEmail }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default newEmailReg;
