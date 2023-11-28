import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  id: number;
  categoryName: string;
}

type ArrayResponseData = Array<ResponseData>;

const deleteCategory = createAsyncThunk<ArrayResponseData, number>(
  'admin/deletecategory',

  async (categoryId) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/category/${categoryId}`
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteCategory;
