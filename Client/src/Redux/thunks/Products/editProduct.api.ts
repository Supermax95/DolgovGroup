import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newInfo: {
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
    subcategoryId: number;
  };
}

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
  subcategoryId: number;
}

interface ResponseDataId {
  postId: number;
  products: ResponseData[];
}

const editProduct = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/editProduct',

  async ({ newInfo }) => {
    console.log(newInfo);
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/products`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default editProduct;
