import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const resetPassword = createAsyncThunk<string, string>(
  'api/resetpassword',
  async (email) => {
    try {
      // const response: AxiosResponse =  
      await axios.post(
        `http://${IP}:${PORT}/api/new-password`,
        { email: email }
      );

      return email;
    } catch (error) {
      console.error('Произошла ошибка при сбросе пароля', error);
      throw error;
    }
  }
);

export default resetPassword;
