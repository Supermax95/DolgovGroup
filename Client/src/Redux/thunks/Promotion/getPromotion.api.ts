import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getPromotions = createAsyncThunk('admin/getPromotions', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/promotions`
  );

  return response.data;
});

export default getPromotions;
