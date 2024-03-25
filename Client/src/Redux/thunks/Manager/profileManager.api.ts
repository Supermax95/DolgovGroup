import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestDate {
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
  managerId: number;
}

interface ResponseData {
  lastName: string;
  firstName: string;
  middleName: string;
  message: string;
}

const editProfileManager = createAsyncThunk<ResponseData, RequestDate>(
  'api/profileManager',
  async (
    { managerId, newLastName, newFirstName, newMiddleName },
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/profileManager/fullName`,
        { managerId, newLastName, newFirstName, newMiddleName }
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

export default editProfileManager;
