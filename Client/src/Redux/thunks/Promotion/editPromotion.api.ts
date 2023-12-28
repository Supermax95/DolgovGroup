import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newInfo: {
    id: number;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    photo: string;
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
  photo: string;
  carousel: boolean;
  invisible: boolean;
}

interface ResponseDataId {
  postId: number;
  promotions: ResponseData[];
}

const editPromotion = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/editPromotion',

  async ({ newInfo }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/promotions`,
        { newInfo }
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

export default editPromotion;
