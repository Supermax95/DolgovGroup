import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

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
  'admin/curentPromotion',

  async (promotionId) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${VITE_URL}/admin/currentpromotion/${promotionId}`
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default currentPromotion;
