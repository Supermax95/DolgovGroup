import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const register = createAsyncThunk('api/register', async (newUser) => {
  const response: AxiosResponse = await axios.post(
    `http://${IP}:${PORT}/api/registration`,
    newUser
  );
  return response.data;
});

export default register;

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import AuthService from '../../!!Services/AuthService';

// export const register = createAsyncThunk(
//   'auth/register',
//   async ({
//     email,
//     password,
//     id,
//     lastName,
//     firstName,
//     middleName,
//     birthDate,
//   }) => {
//     try {
//       const response = await AuthService.registration(
//         email,
//         password,
//         id,
//         lastName,
//         firstName,
//         middleName,
//         birthDate
//       );
//       localStorage.setItem('token', response.data.accessToken);
//       return response.data.user;
//     } catch (error) {
//       throw error.response?.data?.message || 'Произошла ошибка регистрации';
//     }
//   }
// );
