import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PORT, IP } from '@env';

const getProfileInfo = createAsyncThunk('api/profileInfo', async ({userId}) => {
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
        firstName: 'Нет данных',
        birthDate: 'Нет данных',
        email: 'Нет данных',
      };
    }
  } catch (error) {
    console.error('Ошибка при получении данных', error);

    return {
      firstName: 'Нет данных',
      birthDate: 'Нет данных',
      email: 'Нет данных',
    };
  }
});

export default getProfileInfo;
