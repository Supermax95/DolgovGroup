import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface ResponseData {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  photo: string;
  carousel: boolean;
  invisible: boolean;
}

const currentPromotion = createAsyncThunk<ResponseData, number>(
  'api/curentPromotion',

  async (promotionId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/admin/currentpromotion/${promotionId}`
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

export default currentPromotion;
