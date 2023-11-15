import { createAsyncThunk } from '@reduxjs/toolkit';
import { VITE_URL } from '../../../../VITE_URL';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface RequestData {
  newManager: {
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
  };
}

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  isAdmin: boolean;
}

const addManager = createAsyncThunk<ResponseData[], RequestData>(
  'api/addManager',
  async ({ newManager }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/management/newManager`,
        { newManager }
      );

      console.log('response.data', response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addManager;
