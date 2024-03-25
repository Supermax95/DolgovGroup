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

const getCheck = createAsyncThunk<
  ICheckResponse,
  ICheckRequest,
  {
    rejectValue: {
      id: undefined;
      isActivated: undefined;
      userStatus: undefined;
      message: string;
    };
  }
>('api/checkUser', async ({ token }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ICheckResponse> = await axios.get(
      `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}/checkUser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Проверяем, существует ли свойство 'id' в ответе
    if (
      response.data &&
      response.data.id !== undefined &&
      response.data.isActivated !== undefined &&
      response.data.userStatus !== undefined
    ) {
      return response.data;
    } else {
      // Обрабатываем случай, когда 'id' отсутствует или undefined
      console.error(
        'Ошибка: свойство "id" отсутствует или имеет значение undefined'
      );
      return rejectWithValue({
        id: undefined,
        isActivated: undefined,
        userStatus: undefined,
        message:
          'Ошибка: свойство "id" отсутствует или имеет значение undefined',
      });
    }
  } catch (error) {
    // console.error('Ошибка при получении данных', error);
    // Возвращаем объект с ошибкой
    return rejectWithValue({
      id: undefined,
      isActivated: undefined,
      userStatus: undefined,
      message: 'Ошибка при получении данных',
    });
  }
});

export default getCheck;
