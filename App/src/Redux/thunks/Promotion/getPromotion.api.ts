import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const getPromotions = createAsyncThunk('api/getPromotions', async () => {
  const response: AxiosResponse = await axios.get(
    `http://${IP}:${PORT}/admin/promotions`
  );
  console.log('response.data', response.data);

  return response.data;
});

export default getPromotions;
