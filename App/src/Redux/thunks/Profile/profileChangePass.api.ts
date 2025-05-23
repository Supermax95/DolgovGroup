import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { axiosInstance } from '../Logout401/axios.api';
interface RequestData {
  token: string | undefined;
  newPassword: string;
  oldPassword: string;
}

interface ResponseData {
  message?: string;
}

const changeProfilePass = createAsyncThunk<ResponseData, RequestData>(
  'api/profileChangePass',
  async ({ token, newPassword, oldPassword }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/newpassword`,
        { oldPassword, newPassword },
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
        // console.error(error.response.data.error);
        throw rejectWithValue(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);

export default changeProfilePass;
