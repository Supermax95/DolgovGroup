import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newProduct: {
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
// type ArrayResponseData = Array<ResponseData>;

interface ResponseDataId {
  postId: number;
  products: ResponseData[];
}

const addProduct = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/addproduct',

  async ({ newProduct }) => {
    try {
      console.log('axios', newProduct);

      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/products`,
        { newProduct }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addProduct;
