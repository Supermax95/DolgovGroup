import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

// interface RequestData {
//   locationId: number;
// }
// ?Почему-то не дает так протипизировать

interface ResponseData {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

type ArrayResponseData = Array<ResponseData>;

const deleteLocation = createAsyncThunk<ArrayResponseData, number>(
  'admin/deletelocation',

  async (locationId) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${VITE_URL}/admin/locations/${locationId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteLocation;
