import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../../VITE_URL';

interface RequestData {
  managerId: number;
}

interface ResponseData {
  message: string;
}

const sendOneTimePassword = createAsyncThunk<ResponseData, RequestData>(
  'api/sendOneTimePassword',

  async ({ managerId }) => {
    console.log('async managerIdmanagerId', managerId);

    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/management/oneTimePassword`,
        { managerId }
      );
      console.log('response.data', response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default sendOneTimePassword;