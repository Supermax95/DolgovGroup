import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getCategory = createAsyncThunk('admin/category', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/category`
  );  
  return response.data;

});

export default getCategory;
