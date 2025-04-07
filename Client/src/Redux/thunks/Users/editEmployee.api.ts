import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

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

const editEmployees = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editemployee',

  async ({ employeeId, newInfo }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `${VITE_URL}/admin/employees/${employeeId}`,
        { newInfo },
        {
          withCredentials: true,
        }
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
