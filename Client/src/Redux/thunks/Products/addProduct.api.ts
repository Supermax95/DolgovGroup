import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newProduct: {
    productName:string,
    promoStartDate: string,
    promoEndDate: string,
    originalPrice: number,
    customerPrice: number,
    employeePrice: number,
    isNew: boolean,
    isDiscounted: boolean,
    description: string,
    photo: string,
    categoryId: number,
  };
}

interface ResponseData {
    id:number,
    productName:string,
    promoStartDate: string,
    promoEndDate: string,
    originalPrice: number,
    customerPrice: number,
    employeePrice: number,
    isNew: boolean,
    isDiscounted: boolean,
    description: string,
    photo: string,
    categoryId: number,
}

type ArrayResponseData = Array<ResponseData>;

const addProduct = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/addproduct',

  async ({ newProduct }) => {
    try {
      console.log('axios', newProduct);

      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/products`,
        { newProduct }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addProduct;
