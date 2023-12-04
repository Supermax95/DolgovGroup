import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

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

  async ({ newSubcategory, categoryId }) => {
    try {
      console.log('axios', newSubcategory, categoryId);

      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/subcategory`,
        { newSubcategory, categoryId }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addSubcategory;
