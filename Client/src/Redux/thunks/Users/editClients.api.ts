import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  clientId: number;
  newInfo: {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    barcode: string;
    userStatus: string;
    isActivated: boolean;
    bonusProgram: string;
    balance: number;
    phoneNumber: string;
  };
}

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  isActivated: boolean;
  birthDate: Date;
  bonusProgram: string;
  balance: number;
  phoneNumber: string;
}

type ArrayResponseData = Array<ResponseData>;

const editClients = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editclients',
  async ({ clientId, newInfo }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/clients/${clientId}`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw rejectWithValue(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);

export default editClients;
