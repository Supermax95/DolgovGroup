import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

type ArrayResponseData = Array<ResponseData>;

const deleteSubcategory = createAsyncThunk<ArrayResponseData, number>(
  'admin/deletesubcategory',

  async (subcategoryId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/subcategory/${subcategoryId}`
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

export default deleteSubcategory;
