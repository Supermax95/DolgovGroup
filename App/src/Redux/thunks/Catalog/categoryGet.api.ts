// import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { AxiosResponse } from 'axios';
// import axios from 'axios';

// const getCategory = createAsyncThunk('getCategoryUser', async () => {
//   try {
    
//     const response: AxiosResponse = await axios.get(
//       `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/admin/category`
//       );
//     return response.data;
//   } catch (error) {
//     // throw error;
//     console.log(error)
//          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//     console.log(error.request._response)

//   }
// });

// export default getCategory;



import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

const getCategory = createAsyncThunk('getCategoryUser', async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/admin/category`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios request failed:', axiosError.message);
      if (axiosError.response) {
        console.error('Response status:', axiosError.response.status);
        console.error('Response data:', axiosError.response.data);
      }
      if (axiosError.request) {
        console.error('Request:', axiosError.request);
      }
    } else {
      console.error('Non-Axios error occurred:', error);
    }
    throw error; // Прокидываем ошибку дальше, чтобы Redux Toolkit мог обработать её
  }
});

export default getCategory;
