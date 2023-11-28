import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newCategory: string;
}

interface ResponseData {
  id: number;
  categoryName: string;
}

type ArrayResponseData = Array<ResponseData>;

const addCategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/addcategory',

  async ({ newCategory }) => {
    try {
      console.log('axios', newCategory);

      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/category`,
        { newCategory }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addCategory;
