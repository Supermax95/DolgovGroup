import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  email: string;
  password: string;
}

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

const portalLogin = createAsyncThunk<ResponseData, RequestData>(
  'api/login',
  async (manager) => {
    const response: AxiosResponse = await axios.post(
      `${VITE_URL}/portal/login`,
      manager,

      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export default portalLogin;
