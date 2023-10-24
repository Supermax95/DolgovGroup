import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

interface IPropsActivateResponse {
  token:
    | {
        accessToken: string;
        refreshToken?: string;
      }
    | undefined;
  user: {
    email: string;
    firstName: string;
    id: number;
    isActivated: boolean;
  };
}

interface IPropsActivateRequest {
  userId: number;
  token:
    | {
        accessToken: string;
        refreshToken?: string;
      }
    | undefined;
  force?: boolean;
}

const checkActivation = createAsyncThunk<
  IPropsActivateResponse | undefined,
  IPropsActivateRequest
>('api/activate', async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response: AxiosResponse = await axios.get(
      `http://${IP}:${PORT}/check/${userId}`,
      config
    );

    if (response.status === 200) {
      const { data } = response;

      const activatedInfo = {
        token: {
          accessToken: data.token.accessToken,
          refreshToken: data.token.refreshToken,
        },
        user: {
          email: data.user.email,
          firstName: data.user.firstName,
          id: data.user.id,
          isActivated: data.user.isActivated,
        },
      };
      return activatedInfo;
    }
  } catch (error) {
    throw error;
  }
});

export default checkActivation;
