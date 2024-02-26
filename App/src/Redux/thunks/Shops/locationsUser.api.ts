import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { PORT, IP } from '@env';

interface Request {
  token?: string | undefined;
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
  async ({ token }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `http://${IP}:${PORT}/userlocations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default getUserLocations;
