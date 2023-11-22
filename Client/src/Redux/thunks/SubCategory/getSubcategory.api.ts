import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getSubcategory = createAsyncThunk('admin/subcategory', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/subcategory`
  );  
  return response.data;

});

export default getSubcategory;
