import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  subcategoryId: number;
  newInfo: {
    id: number;
    categoryName: string;
    // subcategory: string;
  };
}

interface ResponseData {
  id: number;
  categoryName: string;
  //   subcategory: string;
}

type ArrayResponseData = Array<ResponseData>;

const editCategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editcategory',

  async ({ subcategoryId, newInfo }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/category/${subcategoryId}`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default editCategory;
