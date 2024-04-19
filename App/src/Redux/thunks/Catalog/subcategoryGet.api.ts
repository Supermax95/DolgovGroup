import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getSubcategory = createAsyncThunk('userSubcategory', async () => {
  const response: AxiosResponse = await axios.get(
    `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/admin/subcategory`
  );

  return response.data;
});

export default getSubcategory;
