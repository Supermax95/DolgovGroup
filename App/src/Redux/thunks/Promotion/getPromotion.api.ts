import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

const getPromotions = createAsyncThunk('api/getPromotions', async () => {
  const response: AxiosResponse = await axios.get(
    `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/admin/promotions`
  );

  return response.data;
});

export default getPromotions;
