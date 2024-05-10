import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  newInfo: {
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
    subcategoryId: number;
    invisible: boolean;
  };
}

interface ResponseData {
  id: number;
  article: string;
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  customerPrice: number;
  employeePrice: number;
  photo: string;
  isNew: boolean;
  isDiscounted: boolean;
  description: string;
  subcategoryId: number;
  invisible: boolean;
}

interface ResponseDataId {
  postId: number;
  products: ResponseData[];
}

const editProduct = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/editProduct',

  async ({ newInfo }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `${VITE_URL}/admin/products`,
        { newInfo },
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

export default editProduct;
