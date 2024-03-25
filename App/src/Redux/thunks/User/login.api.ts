import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface RequestData {
  userData: {
    password: string;
    email: string;
  };
}

interface ResponseData {
  activationError: string | undefined;
  accessToken: string;
  refreshToken?: string;
  user: {
    email: string;
    firstName: string;
    id: number;
    isActivated: boolean;
    userStatus:string;
  };
}

const userLogin = createAsyncThunk<ResponseData, RequestData>(
  'api/login',
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/api/login`,
        userData
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

export default userLogin;
