

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';


interface ICheckRequest {
  token?: string | undefined;
}

interface ICheckResponse {
  id: number | undefined;
  isActivated: boolean | undefined;
  message: string;
}

const getCheck = createAsyncThunk<ICheckResponse, ICheckRequest>(
  'api/checkUser',
  async ({ token }) => {
    try {
      const response: AxiosResponse<ICheckResponse> = await axios.get(
        `http://${IP}:${PORT}/checkUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Проверяем, существует ли свойство 'id' в ответе
      if (response.data && response.data.id !== undefined && response.data.isActivated !== undefined) {
        return response.data;
      } else {
        // Обрабатываем случай, когда 'id' отсутствует или undefined
        console.error(
          'Ошибка: свойство "id" отсутствует или имеет значение undefined'
        );
        return {
          id: undefined,
          isActivated:undefined,
          message:
            'Ошибка: свойство "id" отсутствует или имеет значение undefined',
        };
      }
    } catch (error) {
      // console.error('Ошибка при получении данных', error);
      // Возвращаем объект с ошибкой
      return { id: undefined, message: 'Ошибка при получении данных' };
    }
  }
);

export default getCheck;
