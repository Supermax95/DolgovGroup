import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';


interface ResponseData {
    id: number;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    carousel: boolean;
    invisible: boolean;
  }

type ArrayResponseData = Array<ResponseData>;

const deletePromoPhoto = createAsyncThunk<ArrayResponseData, number>(
  'admin/deleteproductPhoto',

  async (promoId) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/promotions/photo/${promoId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deletePromoPhoto;
