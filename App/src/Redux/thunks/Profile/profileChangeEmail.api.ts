import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
// import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface IProfileChangeEmailRequest {
  token?: string | undefined;
  newEmail: string;
}

interface IProfileChangeEmailResponse {
  email: string;
  message: string;
  newEmail: string;
}

const profileChangeEmail = createAsyncThunk<
  IProfileChangeEmailResponse,
  IProfileChangeEmailRequest
>('api/profileChangeEmail', async ({ token, newEmail }) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/email`,
      { newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🚀 ~ > ~ response.data:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export default profileChangeEmail;
