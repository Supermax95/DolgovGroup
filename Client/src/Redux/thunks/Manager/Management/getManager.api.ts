import { createAsyncThunk } from '@reduxjs/toolkit';
import { VITE_URL } from '../../../../VITE_URL';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getManager = createAsyncThunk('api/getManager', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/management/data`
  );
  console.log('afafaf', response.data);

  return response.data;
});

export default getManager;
