import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface IProfileChangeEmailRequest {
  userId: number;
  newEmail: string;
}

interface IProfileChangeEmailResponse {
  email: string;
  message: string;
}

const profileChangeEmail = createAsyncThunk<
  IProfileChangeEmailResponse,
  IProfileChangeEmailRequest
>('api/profileChangeEmail', async ({ userId, newEmail }) => {
  try {
    console.log('=====>', newEmail);
    const response: AxiosResponse = await axios.put(
      `http://${IP}:${PORT}/email/${userId}`,
      { newEmail }
    );
    console.log('responseresponseresponse --> newEmail', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export default profileChangeEmail;
