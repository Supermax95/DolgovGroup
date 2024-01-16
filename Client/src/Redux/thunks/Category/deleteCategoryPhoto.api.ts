import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
    id: number;
    categoryName: string;
}

type ArrayResponseData = Array<ResponseData>;

const deleteCategoryPhoto = createAsyncThunk<ArrayResponseData, number>(
  'admin/deleteCategoryPhoto',

  async (categoryId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/category/photo/${categoryId}`
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

export default deleteCategoryPhoto;
