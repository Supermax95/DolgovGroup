import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface IProfileInfoRequest {
  token?: string | undefined;
}

interface IProfileInfoResponse {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null | string;
  email: string;
  newEmail: string;
  phoneNumber: string;
  notificationPush: boolean;
  notificationEmail: boolean;
}

const getProfileInfo = createAsyncThunk<
  IProfileInfoResponse,
  IProfileInfoRequest,
  {
    rejectValue: {
      lastName: string;
      firstName: string;
      middleName: string;
      birthDate: Date | null | string;
      email: string;
      phoneNumber: string;
    };
  }
>('api/profileInfo', async ({ token }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/edit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const { data } = response;
      const profileInfo: IProfileInfoResponse = {
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
        birthDate: data.birthDate,
        email: data.email,
        newEmail: data.newEmail,
        phoneNumber: data.phoneNumber,
        notificationPush: data.notificationPush,
        notificationEmail: data.notificationEmail,
      };

      return profileInfo;
    }

    return rejectWithValue({
      lastName: 'Нет данных',
      firstName: 'Нет данных',
      middleName: 'Нет данных',
      birthDate: 'Нет данных',
      email: 'Нет данных',
      phoneNumber: 'Нет данных',
    });
  } catch (error) {
    return rejectWithValue({
      lastName: 'Нет данных',
      firstName: 'Нет данных',
      middleName: 'Нет данных',
      birthDate: 'Нет данных',
      email: 'Нет данных',
      phoneNumber: 'Нет данных',
    });
  }
});

export default getProfileInfo;
