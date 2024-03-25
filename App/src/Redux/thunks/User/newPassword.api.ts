import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface RequestData {
  email: string;
}

interface ResponseData {
  message: string;
}

const resetPassword = createAsyncThunk<ResponseData, RequestData>(
  'api/resetpassword',
  async (requestData, { rejectWithValue }) => {
    try {
      await axios.post(`http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/api/new-password`, {
        email: requestData.email,
      });
      const response: ResponseData = {
        message: 'Пароль успешно сброшен',
      };
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
);
export default resetPassword;
