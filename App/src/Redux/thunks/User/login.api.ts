import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  token: string;
  // userData: object;
  userData: {
    password: string;
    email: string;
  };
}

interface ResponseData {
  accessToken: string;
  refreshToken?: string;
  user: {
    email: string;
    firstName: string;
    id: number;
    isActivated: boolean;
  };
}

const userLogin = createAsyncThunk<ResponseData, RequestData>(
  'api/login',
  async ({ token, userData }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response: AxiosResponse = await axios.post(
        `http://${IP}:${PORT}/api/login`,
        userData,
        config
      );
      console.log('response axios', response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default userLogin;
