import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const userRegister = createAsyncThunk('api/register', async (user) => {
  try {
    const response: AxiosResponse = await axios.post(
      `http://${IP}:${PORT}/api/registration`,
      user
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Ошибка при регистрации');
    }
  } catch (error) {
    throw error;
  }
});

export default userRegister;
