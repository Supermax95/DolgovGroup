

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface ICheckRequest {
  token?: string | undefined;
}

interface ICheckResponse {
  id: number | undefined;
  isActivated: boolean | undefined;
  userStatus: string | undefined;
  message: string;
}

const getUserStatus = createAsyncThunk(
  'api/userStatus',
  async ({ token }: ICheckRequest, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICheckResponse> = await axios.get(
        `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/userStatus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Проверяем, существует ли свойство 'id' в ответе
      if (response.data && response.data.userStatus !== undefined) {
        return response.data;
      } else {
        // Обрабатываем случай, когда 'userStatus' отсутствует или undefined
        console.error(
          'Ошибка: свойство "userStatus" отсутствует или имеет значение undefined'
        );
        return rejectWithValue({
          userStatus: undefined,
          message:
            'Ошибка: свойство "userStatus" отсутствует или имеет значение undefined',
        });
      }
    } catch (error) {
      // Возвращаем объект с ошибкой
      return rejectWithValue({
        id: undefined,
        message: 'Ошибка при получении данных',
      });
    }
  }
);

export default getUserStatus;
