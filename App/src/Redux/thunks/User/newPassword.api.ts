

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  email: string;
}

interface ResponseData {
  message: string;
}

const resetPassword = createAsyncThunk<ResponseData, RequestData>(
  'api/resetpassword',
  async (requestData) => {
    try {
      await axios.post(`http://${IP}:${PORT}/api/new-password`, {
        email: requestData.email,
      });
      const response: ResponseData = {
        message: 'Пароль успешно сброшен',
      };
      return response;
    } catch (error) {
      console.error('Произошла ошибка при сбросе пароля', error);
      throw error;
    }
  }
);

export default resetPassword;
