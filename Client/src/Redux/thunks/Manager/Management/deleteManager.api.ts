import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../../VITE_URL';

interface RequestData {
  managerId: number;
}

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

const deleteManager = createAsyncThunk<ResponseData[], RequestData>(
  'api/deleteManager',

  async ({ managerId }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/management/deleteManager`,
        { data: { managerId } }
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

export default deleteManager;
