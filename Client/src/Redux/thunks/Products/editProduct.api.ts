import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  productId: number;
  newInfo: {
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
    photo: File,
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

const editProduct = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editProduct',
  
  async ({ productId, newInfo }) => {
      console.log(newInfo);
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/products/${productId}`,
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