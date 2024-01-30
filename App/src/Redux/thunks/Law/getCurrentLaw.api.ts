import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

interface ResponseData {
  id: number;
  title: string;
  description: string;
  dateFrom: string;
  documentLink: string;
  updatedAt: Date;
}



const currentLaw = createAsyncThunk<ResponseData, number>(
  'admin/curentLaw',

  async (lawId) => {
    try {
      const response: AxiosResponse = await axios.get(
        `http://${IP}:${PORT}/admin/currentlaw/${lawId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default currentLaw;
