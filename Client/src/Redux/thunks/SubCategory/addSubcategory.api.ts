import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  newSubcategory: string;
  categoryId: number;
}

interface ResponseData {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

type ArrayResponseData = Array<ResponseData>;

const addSubcategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/addsubcategory',

  async ({ newSubcategory, categoryId }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${VITE_URL}/admin/subcategory`,
        { newSubcategory, categoryId },
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

export default addSubcategory;
