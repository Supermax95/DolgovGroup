import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface ResponseData {
  id: number;
  title: string;
  description: string;
  dateFrom: string;
  documentLink: string;
  updatedAt: Date;
}

const currentLaw = createAsyncThunk<ResponseData, number>(
  'admin/curentLaw',

  async (lawId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/admin/currentlaw/${lawId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
);

export default currentLaw;
