import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface ICheckRequest {
  token?: string | undefined;
}

interface ICheckResponse {
  id: number | undefined;
  isActivated: boolean | undefined;
  userStatus: string | undefined;
  message: string;
  barcode: string;
}

const getCheck = createAsyncThunk<
  ICheckResponse,
  ICheckRequest,
  {
    rejectValue: {
      id: undefined;
      isActivated: undefined;
      userStatus: undefined;
      barcode: undefined;
      message: string;
    };
  }
>(
  'api/checkUser',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async ({ token }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICheckResponse> = await axiosInstance.get(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/checkUser`,
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
        response.data.userStatus !== undefined &&
        response.data.barcode !== undefined
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
          barcode: undefined,
          message:
            'Ошибка: свойство "id" отсутствует или имеет значение undefined',
        });
      }
    } catch (error) {
      // Проверяем, является ли ошибка ошибкой сертификата

      if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error.request._response ===
        'java.security.cert.CertPathValidatorException: Trust anchor for certification path not found.'
      ) {
        return {};
      } else {
        // Возвращаем объект с общей ошибкой
        console.error('Ошибка при получении данных:', error);
        return rejectWithValue({
          id: undefined,
          isActivated: undefined,
          userStatus: undefined,
          barcode: undefined,
          message: 'Ошибка при получении данных',
        });
      }
    }
  }
);

export default getCheck;
