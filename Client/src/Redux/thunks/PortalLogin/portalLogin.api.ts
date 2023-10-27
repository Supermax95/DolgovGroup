import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  email: string;
  password: string;
}

interface ResponseData {
  manager: {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: Date | null | string;
    email: string;
    isAdmin: boolean;
  };
  message: string;
}

const portalLogin = createAsyncThunk<ResponseData, RequestData>(
  'api/login',
  async (manager) => {
    console.log('manager', manager);

    const response: AxiosResponse = await axios.post(
      `${VITE_URL}/portal/login`,
      manager
    );
    console.log('response axios', response.data);

    return response.data;
  }
);

export default portalLogin;
