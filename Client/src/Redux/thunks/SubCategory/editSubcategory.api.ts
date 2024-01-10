import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  subcategoryId: number;
  newSubcategoryName: string;
}

interface ResponseData {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

type ArrayResponseData = Array<ResponseData>;

const editSubcategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editsubcategory',

  async ({ subcategoryId, newSubcategoryName }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/subcategory/${subcategoryId}`,
        { newSubcategoryName }
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

export default editSubcategory;
