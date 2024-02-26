import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getQuestions = createAsyncThunk('admin/getQuestions', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/questions`
  );  
  return response.data;

});

export default getQuestions;
