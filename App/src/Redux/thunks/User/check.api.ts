import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface ICheckRequest {
  token?: string | undefined;
}

interface ICheckResponse {
  id: number | undefined;
  message: string;
}

const getCheck = createAsyncThunk<ICheckResponse, ICheckRequest>(
  'api/checkUser',
  async ({ token }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `http://${IP}:${PORT}/checkUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data.id);
      return response.data.id;
    } catch (error) {
      console.error('Ошибка при получении данных', error);
    }
  }
);

export default getCheck;
