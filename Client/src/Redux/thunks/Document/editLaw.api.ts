import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  newInfo: {
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

const editLaw = createAsyncThunk<ResponseDataId, RequestData>(
  'admin/editLaw',

  async ({ newInfo }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `${VITE_URL}/admin/laws`,
        { newInfo },
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

export default editLaw;
