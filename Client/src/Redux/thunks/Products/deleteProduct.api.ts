import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  id: number;
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
}

type ArrayResponseData = Array<ResponseData>;

const deleteProduct = createAsyncThunk<ArrayResponseData, number>(
  'admin/deleteproduct',

  async (productId) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/products/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteProduct;
