import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const register = createAsyncThunk('api/register', async (newUser) => {
  const response: AxiosResponse = await axios.post(
    `http://${IP}:${PORT}/register`,
    newUser
  );
  return response.data;
});

export default register;


