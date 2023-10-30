import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

const portalCheck = createAsyncThunk('api/check', async () => {
  const response: AxiosResponse = await axios.get(`${VITE_URL}/portal/check`, {
    withCredentials: true,
  });

  console.log('response axios', response.data);

  return response.data;
});

export default portalCheck;
