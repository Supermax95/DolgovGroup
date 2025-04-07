import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getQuestions = createAsyncThunk('api/getQuestions', async () => {
  const response: AxiosResponse = await axios.get(
    `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/admin/questions`
  );

  return response.data;
});

export default getQuestions;
