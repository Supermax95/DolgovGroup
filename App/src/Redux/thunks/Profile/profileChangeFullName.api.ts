import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface RequestDate {
  token?: string | undefined;
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
}

interface ResponseData {
  lastName: string;
  firstName: string;
  middleName: string;
  message: string;
}

const profileChangeFullName = createAsyncThunk<ResponseData, RequestDate>(
  'api/profileChangeFullName',
  async (
    { token, newLastName, newFirstName, newMiddleName },
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/fullname`,
        {
          newLastName,
          newFirstName,
          newMiddleName,
        },
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

export default profileChangeFullName;
