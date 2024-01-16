import { PORT, IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getProducts = createAsyncThunk('getProductsUser', async () => {
  const response: AxiosResponse = await axios.get(
    `http://${IP}:${PORT}/admin/products`
  );
  console.log(response);
  return response.data;
  
});

export default getProducts;
