import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newQuestion: {
    id: number;
    title: string;
    description: string;
    updatedAt: Date | string;
  };
}

interface ResponseData {
  id: number;
  title: string;
  description: string;
  documentLink: string;
  dateFrom: string;
  updatedAt: Date;
}

interface ResponseDataId {
  postId: number;
  questions: ResponseData[];
}

const newQuestion = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/newQuestion',

  async ({ newQuestion }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/questions`,
        { newQuestion }
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

export default newQuestion;
