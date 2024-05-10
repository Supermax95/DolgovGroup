import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  id: number;
  firstName: string;
  middleName: string;
}

interface ResponseData {
  message: string;
}

const nodemailerActivationSend = createAsyncThunk<ResponseData, RequestData>(
  'admin/nodemailerActivation',

  async ({ id, firstName, middleName }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${VITE_URL}/nodemailerActivation/${id}`,
        { firstName, middleName },
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

export default nodemailerActivationSend;
