import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newCategory: {
    id: number;
    subcategoryName: string;
    categoryId: number;
  };
}

interface ResponseData {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

type ArrayResponseData = Array<ResponseData>;

const addSubcategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/addsubcategory',

  async ({ newCategory }) => {
    try {
      console.log('axios', newCategory);

      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/subcategory`,
        { newCategory }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addSubcategory;
