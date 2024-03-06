import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  isActivated: boolean;
  bonusProgram: string;
  birthDate: Date;
  balance: number;
  phoneNumber: string;
}

type ArrayResponseData = Array<ResponseData>;

const deleteUser = createAsyncThunk<ArrayResponseData, number>(
  'admin/deleteUser',

  async (userId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/userdelete/${userId}`
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

export default deleteUser;
