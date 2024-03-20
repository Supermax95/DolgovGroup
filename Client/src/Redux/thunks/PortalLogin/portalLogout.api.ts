import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  message: string;
}

const portalLogout = createAsyncThunk<ResponseData, void>(
  'api/logout',
  async () => {
    const response: AxiosResponse = await axios.post(
      `${VITE_URL}/portal/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export default portalLogout;
