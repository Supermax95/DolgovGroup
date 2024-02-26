import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  token:
    | {
        accessToken: string;
        refreshToken?: string;
      }
    | undefined;
  userData: {
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

const refreshToken = createAsyncThunk<ResponseData, RequestData>(
  'api/refresh',
  async ({ token, userData }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response: AxiosResponse = await axios.post(
        `http://${IP}:${PORT}/refresh`,
        userData,
        config
      );
    

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default refreshToken;
