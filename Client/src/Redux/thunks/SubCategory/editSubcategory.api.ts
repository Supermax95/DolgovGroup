import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  subcategoryId: number;
  newInfo: {
    id: number;
    subcategoryName: string;
    categoryName: string;
  };
}

interface ResponseData {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

type ArrayResponseData = Array<ResponseData>;

const editSubcategory = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editsubcategory',

  async ({ subcategoryId, newInfo }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/subcategory/${subcategoryId}`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default editSubcategory;
