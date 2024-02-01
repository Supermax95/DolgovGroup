import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newInfo: {
    id: number;
    title: string;
    description: string;
  };
}

interface ResponseDataQ {
    id: number;
    title: string;
    description: string;
}

interface ResponseData {
  questions: ResponseDataQ[];
}



const editQuestion = createAsyncThunk<ResponseData, RequestData>(
  'admin/editQuestion',


  async ({ newInfo }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/questions`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response data:', error.response.data.error);
        throw rejectWithValue(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);


export default editQuestion;
