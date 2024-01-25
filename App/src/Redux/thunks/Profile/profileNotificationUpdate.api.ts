import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  token?: string | undefined;
  notificationPush: boolean;
  notificationEmail: boolean;
}

interface ResponseData {
  message: string;
  notificationPush: boolean;
  notificationEmail: boolean;
}

const profileNotification = createAsyncThunk<ResponseData, RequestData>(
  'api/notification',
  async (
    { token, notificationPush, notificationEmail },
    { rejectWithValue }
  ) => {    
    try {
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/notification`,
        {
          notificationPush,
          notificationEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.error(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
);

export default profileNotification;
