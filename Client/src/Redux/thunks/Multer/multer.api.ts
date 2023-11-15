import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  id: number;
  file: File;
}

interface ResponseData {
  message: string;
}

const multerProduct = createAsyncThunk<ResponseData, RequestData>(
  'admin/multer',
  async ({ id, file }) => {
    console.log(file);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response: AxiosResponse<ResponseData> = await axios.post(
        `${VITE_URL}/admin/productsPhoto/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default multerProduct;
