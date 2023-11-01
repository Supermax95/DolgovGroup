// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { AxiosResponse } from 'axios';
// import axios from 'axios';
// import { VITE_URL } from '../../../VITE_URL';

// interface RequestDate {
//   managerId: number;
// }

// interface ResponseData {
//   manager: {
//     id: number;
//     lastName: string;
//     firstName: string;
//     middleName: string;
//     birthDate: Date | null | string;
//     email: string;
//     isAdmin: boolean;
//   };
//   message: string;
// }
// const getProfileManager = createAsyncThunk<
//   ResponseData,
//   RequestDate,
//   {
//     rejectValue: {
//       lastName: string;
//       firstName: string;
//       middleName: string;
//       birthDate: Date | null | string;
//       email: string;
//     };
//   }
// >('api/profileManager', async ({ managerId }) => {
//   try {
//     const response: AxiosResponse = await axios.get(
//       `${VITE_URL}/profileManager/info/${managerId}`
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Ошибка при получении данных', error);
//   }
// });

// export default getProfileManager;
