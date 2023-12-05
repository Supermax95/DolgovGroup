import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  locationId: number;
  newInfo: {
    id: number;
    city: string;
    address: string;
    latitude: string;
    longitude: string;
    hours: string;
    invisible: boolean;
  };
}

interface ResponseData {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
  invisible: boolean;
}

type ArrayResponseData = Array<ResponseData>;

const editLocation = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editlocation',

  async ({ locationId, newInfo }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/locations/${locationId}`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default editLocation;
