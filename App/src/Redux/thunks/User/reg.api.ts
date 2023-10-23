import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  birthDate?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  password?: string;
}

interface ResponseData {
  user: {
    email: string;
    firstName: string;
    id: number;
    isActivated: boolean;
  };
}

const userRegister = createAsyncThunk<ResponseData, RequestData>(
  'api/register',
  async (user) => {
    // console.log('datadatadatadatadatadata', typeof user.birthDate);
    //console.log('datadatadatadatadatadata', user.birthDate.getMonth());

    try {
      const response: AxiosResponse = await axios.post(
        `http://${IP}:${PORT}/api/registration`,
        user
      );
      //console.log('response.datadatadatadatadatadata', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Ошибка при регистрации');
      }
    } catch (error) {
      throw error;
    }
  }
);

export default userRegister;
