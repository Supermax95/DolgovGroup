import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  token: string | undefined;
  titleMessage: string;
  message: string;
}

interface ResponseData {
  message: string;
}

const nodemailerSend = createAsyncThunk<ResponseData, RequestData>(
  'api/supportNodemailerRouter',
  async ({ token, titleMessage, message }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/supportNodemailerRouter`,
        { titleMessage, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.error(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
);

export default nodemailerSend;
