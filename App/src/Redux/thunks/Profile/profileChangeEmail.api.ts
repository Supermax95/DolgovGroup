import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

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
    const response: AxiosResponse = await axios.put(
      `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/email`,
      { newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
});

export default profileChangeEmail;
