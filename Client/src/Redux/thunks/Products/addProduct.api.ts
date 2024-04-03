import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  newProduct: {
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
  isNew: boolean;
  photo: string;
  isDiscounted: boolean;
  description: string;
  subcategoryId: number;
  invisible: boolean;
}
// type ArrayResponseData = Array<ResponseData>;

interface ResponseDataId {
  postId: number;
  products: ResponseData[];
}

const addProduct = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/addproduct',

  async ({ newProduct }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${VITE_URL}/admin/products`,
        { newProduct }
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

export default addProduct;
