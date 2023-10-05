// import $api from 'Redux/!!Index';
// import AuthResponse  from 'Types/AuthResponse';
// import type { AxiosResponse } from 'axios';
// export default class AuthService {
//   static async login(
//     email: string,
//     password: string
//   ): Promise<AxiosResponse<AuthResponse>> {
//     return $api.post<AuthResponse>('/login', { email, password });
//   }

//   static async registration(
//     email: string,
//     password: string,
//     id: number,
//     lastName: string,
//     firstName: string,
//     middleName: string,
//     birthDate: string,
//   ): Promise<AxiosResponse<AuthResponse>> {
//     return $api.post<AuthResponse>('/registration', {
//       email,
//       password,
//       lastName,
//       firstName,
//       middleName,
//       birthDate,
//     });
//   }

//   static async logout(): Promise<void> {
//     return $api.post('/logout');
//   }
// }
