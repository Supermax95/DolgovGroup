// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { AxiosResponse } from 'axios';
// import axios from 'axios';
// import { PORT, IP } from '@env';

// interface IProfileInfoRequest {
//   userId: number;
// }

// interface IProfileInfoResponse {
//   lastName: string;
//   firstName: string;
//   middleName: string;
//   birthDate: Date | null | string;
//   email: string;
// }

// const getProfileInfo = createAsyncThunk<
//   IProfileInfoResponse,
//   IProfileInfoRequest
// >('api/profileInfo', async ({ userId }) => {
//   try {
//     const response: AxiosResponse = await axios.get(
//       `http://${IP}:${PORT}/edit/${userId}`
//     );

//     if (response.status === 200) {
//       const { data } = response;
//       const profileInfo = {
//         lastName: data.lastName,
//         firstName: data.firstName,
//         middleName: data.middleName,
//         birthDate: data.birthDate,
//         email: data.email,
//       };

//       return profileInfo;
//     }
//   } catch (error) {
//     console.error('Ошибка при получении данных', error);

//     return {
//       lastName: 'Нет данных',
//       firstName: 'Нет данных',
//       middleName: 'Нет данных',
//       birthDate: 'Нет данных',
//       email: 'Нет данных',
//     };
//   }
// });

// export default getProfileInfo;

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface IProfileInfoRequest {
  token?: string | undefined;

}

interface IProfileInfoResponse {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null | string;
  email: string;
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
    };
  }
>('api/profileInfo', async ({ token }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://${IP}:${PORT}/edit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
      };

      return profileInfo;
    }

    return rejectWithValue({
      lastName: 'Нет данных',
      firstName: 'Нет данных',
      middleName: 'Нет данных',
      birthDate: 'Нет данных',
      email: 'Нет данных',
    });
  } catch (error) {
    console.error('Ошибка при получении данных', error);

    return rejectWithValue({
      lastName: 'Нет данных',
      firstName: 'Нет данных',
      middleName: 'Нет данных',
      birthDate: 'Нет данных',
      email: 'Нет данных',
    });
  }
});

export default getProfileInfo;
