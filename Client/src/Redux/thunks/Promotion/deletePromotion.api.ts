import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface ResponseData {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  photo: string;
  carousel: boolean;
  invisible: boolean;
}

type ArrayResponseData = Array<ResponseData>;

const deletePromotion = createAsyncThunk<ArrayResponseData, number>(
  'admin/deletePromotion',

  async (promotionId) => {
    try {
      const response: AxiosResponse = await axiosInstance.delete(
        `${VITE_URL}/admin/promotions/${promotionId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deletePromotion;
