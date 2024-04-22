import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
// import { axiosInstance } from '../Logout401/axios.api';

interface ICheckRequest {
  token?: string | undefined;
}

interface ICheckResponse {
  id: number | undefined;
  barcode: string | undefined;
}

const getBarcode = createAsyncThunk<ICheckResponse, ICheckRequest>(
  'api/checkBarcode',
  async ({ token }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/barcode`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Проверяем, существует ли свойство 'id' в ответе
      if (response.data && response.data.barcode !== undefined) {
        return response.data;
      } else {
        console.error(
          'Ошибка: свойство "barcode" отсутствует или имеет значение undefined'
        );
        return {
          barcode: undefined,
          message:
            'Ошибка: свойство "barcode" отсутствует или имеет значение undefined',
        };
      }
    } catch (error) {
      // console.error('Ошибка при получении данных', error);
      // Возвращаем объект с ошибкой
      return { id: undefined, message: 'Ошибка при получении данных' };
    }
  }
);

export default getBarcode;
