import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

const getManagerInfo = createAsyncThunk<ResponseData[], void>(
  'api/getManagerInfo',
  async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${VITE_URL}/profileManager/info`
      );

      console.log('response.data get arr', response.data);

      return response.data;
    } catch (error) {
      console.log('Ошибка при получении данных', error);
      throw error;
    }
  }
);

export default getManagerInfo;
