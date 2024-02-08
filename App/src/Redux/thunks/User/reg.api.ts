import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

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
  user: {
    email: string;
    firstName: string;
    id: number;
    isActivated: boolean;
  };
}

const userRegister = createAsyncThunk<ResponseData, RequestData>(
  'api/register',
  async (user,{ rejectWithValue }) => {    
    try {
      const response: AxiosResponse = await axios.post(
        `http://${IP}:${PORT}/api/registration`,
        user
      );
      if (response.status === 200) {
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
