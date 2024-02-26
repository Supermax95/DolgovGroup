import { PORT, IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getCategory = createAsyncThunk('getCategoryUser', async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://${IP}:${PORT}/admin/category`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export default getCategory;
