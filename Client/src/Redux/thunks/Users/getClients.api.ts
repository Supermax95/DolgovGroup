import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getClients = createAsyncThunk('admin/getClients', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/clients`
  );  
  return response.data;

});

export default getClients;
