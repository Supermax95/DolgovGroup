import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

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
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/profileManager/phone`,
        { managerId, newPhone }
      );

      console.log('response.data phone', response.data);

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
