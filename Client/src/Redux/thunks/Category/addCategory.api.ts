import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newCategory: {
    id: number;
    categoryName: string;
    // subcategory: string;
  };
}

interface ResponseData {
    id: number;
    categoryName: string;
    // subcategory: string;
}

type ArrayResponseData = Array<ResponseData>;

const addLocation = createAsyncThunk<ArrayResponseData, RequestData>(
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

export default addLocation;
