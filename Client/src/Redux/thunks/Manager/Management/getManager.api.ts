import { createAsyncThunk } from '@reduxjs/toolkit';
import { VITE_URL } from '../../../../VITE_URL';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null | string;
  email: string;
  isAdmin: boolean;
}

const getManager = createAsyncThunk<ResponseData[], void>(
  'api/getManager',
  async () => {
    const response: AxiosResponse = await axios.get(
      `${VITE_URL}/management/data`
    );

    return response.data;
  }
);

export default getManager;
