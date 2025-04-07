import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

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

  async (productId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.delete(
        `${VITE_URL}/admin/products/photo/${productId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response data:', error.response.data.error);
        throw rejectWithValue(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);

export default deleteProductPhoto;
