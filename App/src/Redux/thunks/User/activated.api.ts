// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios, { AxiosResponse } from 'axios';
// import { PORT, IP } from '@env';

// interface IPropsActivate {
//   token: string;
//   userId : number;
// }

// const checkActivation = createAsyncThunk(
//   'api/activate',
//   async ({ userId, token }:IPropsActivate) => {
//     console.log('userId axios', token);

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       };
//       const response: AxiosResponse= await axios.get(
//         `http://${IP}:${PORT}/check/${userId}`,
//         config
//       );
//       return response.status === 200;
//     } catch (error) {
//       return false;
//     }
//   }
// );

// export default checkActivation;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

interface IPropsActivate {
  token: string;
  userId : number;
}

const checkActivation = createAsyncThunk(
  'api/activate',
  async ({ userId, token }:IPropsActivate) => {
    console.log('userId axios', token);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response: AxiosResponse= await axios.get(
        `http://${IP}:${PORT}/check/${userId}`,
        config
      );
      console.log('-------->', response.data);
      
      return response.data;
    } catch (error) {
      return false;
    }
  }
);

export default checkActivation;

