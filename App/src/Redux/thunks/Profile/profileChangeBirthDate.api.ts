import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestData {
  newBirthDate: Date | null | string;
  token?: string | undefined;
}
interface ResponseData {
  birthDate: Date | null | string;
}
const profileChangeBirthDate = createAsyncThunk<ResponseData, RequestData>(
  'api/profileChangeBirthDate',

  async ({ newBirthDate, token }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/calendar`,
        { newBirthDate },
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
        throw rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
);
export default profileChangeBirthDate;
