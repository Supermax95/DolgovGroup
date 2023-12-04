import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  categoryId: number;
  newCategoryName: string;
}

interface ResponseData {
  id: number;
  categoryName: string;
}

type ArrayResponseData = Array<ResponseData>;

const editCategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editcategory',

  async ({ categoryId, newCategoryName }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/category/${categoryId}`,
        { newCategoryName }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default editCategory;
