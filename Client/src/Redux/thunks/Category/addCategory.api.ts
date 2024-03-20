import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newCategory: string;
}

interface ResponseData {
  id: number;
  categoryName: string;
  error?: string;
}

type ArrayResponseData = Array<ResponseData>;

const addCategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/addcategory',

  async ({ newCategory }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/category`,
        { newCategory }
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

export default addCategory;
