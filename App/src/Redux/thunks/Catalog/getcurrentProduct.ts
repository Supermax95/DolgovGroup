import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface ResponseData {
  id: number;
  // article: string;
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  customerPrice: number;
  employeePrice: number;
  isNew: boolean;
  isDiscounted: boolean;
  description: string;
  photo: string;
  subcategoryId: number;
  invisible: boolean;
}

const currentProduct = createAsyncThunk<ResponseData, number>(
  'api/curentProduct',

  async (productId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/admin/currentproduct/${productId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.error(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
);

export default currentProduct;
