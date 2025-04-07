import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

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

const deleteLocation = createAsyncThunk<ArrayResponseData, number>(
  'admin/deletelocation',

  async (locationId) => {
    try {
      const response: AxiosResponse = await axiosInstance.delete(
        `${VITE_URL}/admin/locations/${locationId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default deleteLocation;
