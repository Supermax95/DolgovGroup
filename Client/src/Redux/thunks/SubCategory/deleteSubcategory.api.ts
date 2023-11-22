import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  id: number;
  subcategoryName: string;
  // subcategory: string;
}

type ArrayResponseData = Array<ResponseData>;

const deleteSubcategory = createAsyncThunk<ArrayResponseData, number>(
  'admin/deletesubcategory',

  async (subcategoryId) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/subcategory/${subcategoryId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteSubcategory;
