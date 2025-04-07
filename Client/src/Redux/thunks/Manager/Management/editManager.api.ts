import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../../VITE_URL';
import { axiosInstance } from '../../Logout401/axios.api';

interface RequestData {
  managerId: number;
  updateManager: {
    lastName: string;
    firstName: string;
    middleName: string;
    phone: string;
    email: string;
  };
}

interface ResponseData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  error?: string;
}

interface ServerResponse {
  managers: ResponseData[];
}

const editManager = createAsyncThunk<ServerResponse, RequestData>(
  'api/editManager',

  async ({ managerId, updateManager }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `${VITE_URL}/management/updateManager`,
        { managerId, updateManager },
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

export default editManager;
