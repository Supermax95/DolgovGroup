// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { AxiosResponse } from 'axios';
// import axios from 'axios';
// import { PORT, IP } from '@env';

// const userRegister = createAsyncThunk('api/register', async (newUser) => {
//   const response: AxiosResponse = await axios.post(
//     `http://${IP}:${PORT}/api/registration`,
//     newUser
//   );
//   return response.data;
// });

// export default userRegister;


import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const userRegister = createAsyncThunk('api/register', async (newUser) => {
  try {
    const response: AxiosResponse = await axios.post(
      `http://${IP}:${PORT}/api/registration`,
      newUser
    );
    
  
    if (response.status === 200) {
      console.log('=====>',response.data)
      return response.data; 
    } else {
      throw new Error('Ошибка при регистрации'); 
    }
  } catch (error) {
    throw error;
  }
});

export default userRegister;