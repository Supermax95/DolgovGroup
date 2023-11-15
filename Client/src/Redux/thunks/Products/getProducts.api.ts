import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getProducts = createAsyncThunk('admin/getproducts', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/products`
  );  
  return response.data;

});

export default getProducts;
