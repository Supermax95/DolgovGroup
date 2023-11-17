import { createAsyncThunk } from '@reduxjs/toolkit';
import { VITE_URL } from '../../../../VITE_URL';
import axios, { AxiosResponse } from 'axios';

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
  error?: string;
}

const addManager = createAsyncThunk<ResponseData[], RequestData>(
  'api/addManager',
  async ({ newManager }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/management/newManager`,
        { newManager }
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addManager;
