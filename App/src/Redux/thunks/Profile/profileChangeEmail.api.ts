import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface IProfileChangeEmailRequest {
  token?: string | undefined;
  newEmail: string;
}

interface IProfileChangeEmailResponse {
  email: string;
  message: string;
}

const profileChangeEmail = createAsyncThunk<
  IProfileChangeEmailResponse,
  IProfileChangeEmailRequest
>('api/profileChangeEmail', async ({ token, newEmail }) => {
  try {
    const response: AxiosResponse = await axios.put(
      `http://${IP}:${PORT}/email`,
      { newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('responseresponseresponse --> newEmail', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export default profileChangeEmail;
