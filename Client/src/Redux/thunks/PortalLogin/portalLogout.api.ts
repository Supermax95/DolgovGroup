import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

const portalLogout = createAsyncThunk('api/logout', async () => {
  const response: AxiosResponse = await axios.post(`${VITE_URL}/portal/logout`);
  console.log('response axios', response.data);

  return response.data;
});

export default portalLogout;