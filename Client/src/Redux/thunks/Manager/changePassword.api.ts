import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestDate {
  managerId: number;
  oldPassword: string;
  newPassword: string;
}

interface ResponseData {
  message: string;
}

const changePassword = createAsyncThunk<ResponseData, RequestDate>(
  'api/changePassword',
  async ({ managerId, oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `${VITE_URL}/profileManager/password`,
        { managerId, oldPassword, newPassword }
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

export default changePassword;
