import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const register = createAsyncThunk('registration/register', async (newUser) => {
  const response: AxiosResponse = await axios.post(
    'http://localhost:3000/register',
    newUser
  );
  return response.data;
});

export default register;
