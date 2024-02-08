import { createAsyncThunk } from '@reduxjs/toolkit';
import { PORT, IP } from '@env';
import axios, { AxiosResponse } from 'axios';

interface SendActivationLinkResponse {
  message: string;
}

interface IPropsActivateRequest {
  userId?: number | undefined;
  force?: boolean;
}

const sendActivationLink = createAsyncThunk<
  SendActivationLinkResponse,
  IPropsActivateRequest
>('api/sendActivationLink', async ({ userId }) => {
  try {
    const response = await axios.post<
      AxiosResponse<SendActivationLinkResponse>
    >(`http://${IP}:${PORT}/sendNewActivationLink/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
});

export default sendActivationLink;
