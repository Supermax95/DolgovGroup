import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface RequestData {
  birthDate?: Date | null | string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  password?: string;
}

interface ResponseData {
  // user: {
  //   email: string;
  //   firstName: string;
  //   id: number;
  //   isActivated: boolean;
  // };
  email: string;
}

const userRegister = createAsyncThunk<ResponseData, RequestData>(
  'api/register',
  async (user, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/api/registration`,
        user
      );
      if (response.status === 200) {
        console.log('🚀 ~ response.data:', response.data);
        return response.data;
      } else {
        throw new Error('Ошибка при регистрации');
      }
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

export default userRegister;
