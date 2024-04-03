import { createAsyncThunk } from '@reduxjs/toolkit';
import { VITE_URL } from '../../../../VITE_URL';
import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../../Logout401/axios.api';

interface RequestData {
  newManager: {
    lastName: string;
    firstName: string;
    middleName: string;
    phone: string;
    email: string;
  };
}

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  error?: string;
}

interface ServerResponse {
  managers: ResponseData[];
}

const addManager = createAsyncThunk<ServerResponse, RequestData>(
  'api/addManager',
  async ({ newManager }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${VITE_URL}/management/newManager`,
        { newManager }
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

export default addManager;
