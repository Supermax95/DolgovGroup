import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  newLocation: {
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

const addLocation = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/addlocation',

  async ({ newLocation }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/admin/locations`,
        { newLocation }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default addLocation;
