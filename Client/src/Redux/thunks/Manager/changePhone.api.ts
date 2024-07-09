import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestDate {
  managerId: number;
  newPhone: string;
}

interface ResponseData {
  phone: string;
  message: string;
}

const changePhone = createAsyncThunk<ResponseData, RequestDate>(
  'api/changePhone',
  async ({ managerId, newPhone }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `${VITE_URL}/profileManager/phone`,
        { managerId, newPhone },
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

export default changePhone;
