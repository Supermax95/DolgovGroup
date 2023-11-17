import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../../VITE_URL';

interface RequestData {
  managerId: number;
  updateManager: {
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

const editManager = createAsyncThunk<ResponseData[], RequestData>(
  'api/editManager',

  async ({ managerId, updateManager }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/management/updateManager`,
        { managerId, updateManager }
      );
      console.log('response.data', response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default editManager;
