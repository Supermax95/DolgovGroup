import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  employeeId: number;
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
  bonusProgram: string;
  balance: number;
}

type ArrayResponseData = Array<ResponseData>;

const editEmployees = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editemployee',

  async ({ employeeId, newInfo }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/employees/${employeeId}`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response data:', error.response.data.error);
        throw rejectWithValue(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);

export default editEmployees;
