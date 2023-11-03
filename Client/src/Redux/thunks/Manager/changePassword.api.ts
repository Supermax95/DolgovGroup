import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestDate {
  managerId: number;
  oldPassword: string;
  newPassword: string;
}

interface ResponseData {
  message: string;
}

const changePassword = createAsyncThunk<ResponseData, RequestDate>(
  'api/changePassword',
  async ({ managerId, oldPassword, newPassword }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/profileManager/password`,
        { managerId, oldPassword, newPassword }
      );

      return response.data;
    } catch (error) {
      console.log('Ошибка при получении данных', error);
      throw error;
    }
  }
);

export default changePassword;
