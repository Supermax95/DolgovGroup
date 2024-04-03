import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

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
      const response: AxiosResponse = await axiosInstance.post(
        `${VITE_URL}/admin/category`,
        { newCategory },
        {
          withCredentials: true,
        }
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
