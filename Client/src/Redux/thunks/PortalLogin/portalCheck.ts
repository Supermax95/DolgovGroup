import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  managerId: number;
  isAdmin: boolean;
  message: string;
}

const portalCheck = createAsyncThunk<ResponseData, void>(
  'api/check',
  async () => {
    const response: AxiosResponse = await axios.get(
      `${VITE_URL}/portal/check`,

      {
        withCredentials: true,
      }
    );

    console.log('response axios check', response.data);

    return response.data;
  }
);

export default portalCheck;
