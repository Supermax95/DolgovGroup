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
  console.log('api/sendActivationLink', userId);
  try {
    const response = await axios.post<
      AxiosResponse<SendActivationLinkResponse>
    >(`http://${IP}:${PORT}/sendNewActivationLink/${userId}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
});

export default sendActivationLink;
