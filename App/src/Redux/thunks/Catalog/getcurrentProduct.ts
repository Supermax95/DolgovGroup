import { PORT, IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface ResponseData {
  id: number;
  article: string;
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

  async (productId) => {
    try {
      const response: AxiosResponse = await axios.get(
        `http://${IP}:${PORT}/admin/currentproduct/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default currentProduct;
