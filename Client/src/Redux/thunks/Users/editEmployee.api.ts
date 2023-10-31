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
}

type ArrayResponseData = Array<ResponseData>;

const editEmployees = createAsyncThunk<ArrayResponseData, RequestData>(
  'admin/editemployee',

  async ({ employeeId, newInfo }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `${VITE_URL}/admin/employees/${employeeId}`,
        { newInfo }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default editEmployees;
