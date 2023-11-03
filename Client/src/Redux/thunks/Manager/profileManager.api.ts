import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestDate {
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
  managerId: number;
}

interface ResponseData {
  lastName: string;
  firstName: string;
  middleName: string;
  message: string;
}

const editProfileManager = createAsyncThunk<ResponseData, RequestDate>(
  'api/profileManager',
  async ({ managerId, newLastName, newFirstName, newMiddleName }) => {
    console.log(
      'newLastName, newFirstName, newMiddleName',
      newLastName,
      newFirstName,
      newMiddleName
    );

    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/profileManager/info/`,
        { managerId, newLastName, newFirstName, newMiddleName }
      );
      console.log('response.dataresponse.data', response.data);

      return response.data;
    } catch (error) {
      console.error('Ошибка при получении данных', error);
    }
  }
);

export default editProfileManager;
