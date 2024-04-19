import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

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
    id?: number | undefined;
    isActivated: boolean;
    userStatus: string;
  };
}

interface IPropsActivateRequest {
  userEmail: string;
  force?: boolean;
}

const checkActivation = createAsyncThunk<
  IPropsActivateResponse | undefined,
  IPropsActivateRequest
>('api/activate', async ({ userEmail }) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/check/${userEmail}`
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
          userStatus: data.user.userStatus,
        },
      };
      return activatedInfo;
    }
  } catch (error) {
    throw error;
  }
});

export default checkActivation;
