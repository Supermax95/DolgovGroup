import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

interface IProfileInfoRequest {
  userId: number;
}

interface IProfileInfoResponse {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  email: string;
}

const getProfileInfo = createAsyncThunk<
  IProfileInfoResponse,
  IProfileInfoRequest
>('api/profileInfo', async ({ userId }) => {
  try {
    const response = await axios.get(`http://${IP}:${PORT}/edit/${userId}`);

    if (response.status === 200) {
      const { data } = response;
      const profileInfo = {
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
        birthDate: data.birthDate,
        email: data.email,
      };

      return profileInfo;
    } else {
      console.error('Ошибка при получении данных', response.status);
      return {
        lastName: 'Нет данных',
        firstName: 'Нет данных',
        middleName: 'Нет данных',
        birthDate: 'Нет данных',
        email: 'Нет данных',
      };
    }
  } catch (error) {
    console.error('Ошибка при получении данных', error);

    return {
      lastName: 'Нет данных',
      firstName: 'Нет данных',
      middleName: 'Нет данных',
      birthDate: 'Нет данных',
      email: 'Нет данных',
    };
  }
});

export default getProfileInfo;
