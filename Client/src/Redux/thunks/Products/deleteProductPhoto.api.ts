import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';


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

type ArrayResponseData = Array<ResponseData>;

const deleteProductPhoto = createAsyncThunk<ArrayResponseData, number>(
  'admin/deleteproductPhoto',

  async (productId) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/products/photo/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteProductPhoto;
