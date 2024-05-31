import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { axiosInstance } from '../Logout401/axios.api';

interface Request {
  // token?: string | undefined;
}

interface ResponseDataLocation {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

type ResponseData = Array<ResponseDataLocation>;

// interface ResponseData {
//   data: any;
// }

const getUserLocations = createAsyncThunk<ResponseData, Request>(
  'api/getuserlocations',
  // async ({ token }) => {
  async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
          //  const response: AxiosResponse = await axios.get(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}/userlocations`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default getUserLocations;
