import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getProducts = createAsyncThunk('getProductsUser', async () => {
  const response: AxiosResponse = await axios.get(
    `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/admin/products`
  );
  return response.data;
});

export default getProducts;
