import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface ResponseData {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
}

type ArrayResponseData = Array<ResponseData>;

const deleteQuestion = createAsyncThunk<ArrayResponseData, number>(
  'admin/deleteQuestions',
  async (questionId) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/questions/${questionId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteQuestion;
