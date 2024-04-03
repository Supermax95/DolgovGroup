import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  newLaw: {
    id: number;
    title: string;
    description: string;
    documentLink: string;
    dateFrom: string;
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
  laws: ResponseData[];
}

const addLaw = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/addLaw',

  async ({ newLaw }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${VITE_URL}/admin/laws`,
        { newLaw },
        {
          withCredentials: true,
        }
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

export default addLaw;
