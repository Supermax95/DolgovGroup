import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getLocations = createAsyncThunk('admin/getlocations', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/locations`
  );  
  return response.data;

});

export default getLocations;
