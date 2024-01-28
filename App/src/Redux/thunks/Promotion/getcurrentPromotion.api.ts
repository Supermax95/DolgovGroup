import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

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

  async (promotionId) => {
    try {
      const response: AxiosResponse = await axios.get(
        `http://${IP}:${PORT}/admin/currentpromotion/${promotionId}`
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default currentPromotion;
