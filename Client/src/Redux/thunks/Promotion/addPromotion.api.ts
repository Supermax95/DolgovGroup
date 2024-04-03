import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  newPromotion: {
    id: number;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    photo?: string;
    carousel: boolean;
    invisible: boolean;
  };
}

interface ResponseData {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  photo?: string;
  carousel: boolean;
  invisible: boolean;
}

interface ResponseDataId {
  postId: number;
  promotions: ResponseData[];
}

const addPromotion = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/addPromotion',

  async ({ newPromotion }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${VITE_URL}/admin/promotions`,
        { newPromotion }
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

export default addPromotion;
