import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newLaw: {
    id: number;
    title: string;
    description: string;
    dateFrom: string;
    updatedAt: Date;
  };
}

interface ResponseData {
    id: number;
    title: string;
    description: string;
    dateFrom: string;
    updatedAt: Date;
}

interface ResponseDataId {
    postId: number;
    laws: ResponseData[];
  }


  const addLaw= createAsyncThunk<ResponseDataId, RequestData>(
    'admin/addLaw',
  
    async ({ newLaw }, { rejectWithValue }) => {
      try { 
        const response: AxiosResponse = await axios.post(
          `${VITE_URL}/admin/laws`,
          { newLaw }
        );
        console.log(response.data);
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
  
  export default addLaw;
  