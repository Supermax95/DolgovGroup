import { PORT, IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getSubcategory = createAsyncThunk('userSubcategory', async () => {
  const response: AxiosResponse = await axios.get(
    `http://${IP}:${PORT}/admin/subcategory`
  );

  return response.data;
});

export default getSubcategory;
