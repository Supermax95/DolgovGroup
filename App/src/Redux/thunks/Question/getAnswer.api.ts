import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface ResponseData {
  id: number;
  title: string;
  description: string;
}

const getAnswers = createAsyncThunk<ResponseData, number>(
  'api/getAnswers',
  async (questionId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/admin/questions/${questionId}`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.error('Server response data:', error.response.data.error);
        throw rejectWithValue(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);

export default getAnswers;
