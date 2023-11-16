import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../../VITE_URL';

interface RequestData {
  managerId: number;
}

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  isAdmin: boolean;
}

const deleteManager = createAsyncThunk<ResponseData[], RequestData>(
  'api/deleteManager',

  async ({ managerId }) => {
    console.log('async managerIdmanagerId', managerId);

    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/management/deleteManager`,
        { data: { managerId } }
      );
      console.log('response.data', response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteManager;
