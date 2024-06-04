import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
// import { VITE_URL } from '../../../VITE_URL';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface ResponseData {
  // id: number;
  // lastName: string;
  // firstName: string;
  // middleName: string;
  // email: string;
  // barcode: string;
  // userStatus: string;
  // isActivated: boolean;
  // bonusProgram: string;
  // birthDate: Date;
  // balance: number;
  phoneNumber: string;
  token?: string | undefined;
}

type ArrayResponseData = Array<ResponseData>;

const profileDelete = createAsyncThunk<ArrayResponseData, number>(
  'admin/profileDelete',

  async ({ phoneNumber, token }, { rejectWithValue }) => {
    console.log(
      '🚀 ~ phoneNumber================================>:',
      phoneNumber
    );
    try {
      const response: AxiosResponse = await axiosInstance.delete(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/profile/${phoneNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('🚀 ~ response.data:', response.data);
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

export default profileDelete;
