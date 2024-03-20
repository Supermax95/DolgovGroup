import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface RequestData {
  token: string | undefined;
}

interface ResponseData {
  updatedUser: {
    email: string;
    firstName: string;
    id: number;
    isActivated: boolean;
    userStatus: string;
  };
}

const checkEmployee = createAsyncThunk<ResponseData, RequestData>(
  'api/checkEmployee',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/checkEmployee`,
        {},
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

export default checkEmployee;
