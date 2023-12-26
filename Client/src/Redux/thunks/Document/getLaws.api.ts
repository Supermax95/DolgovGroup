import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getLaws = createAsyncThunk('admin/getDocument', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/laws`
  );  
  console.log('responseGet', response.data);
  return response.data;

});

export default getLaws;
