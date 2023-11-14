import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';

interface RequestData {
  id: number;
  firstName: string;
  middleName: string;
}

interface ResponseData {
  message: string;
}

const nodemailerActivationSend  = createAsyncThunk<ResponseData, RequestData>(
  'admin/nodemailerActivation',

  async ({ id, firstName, middleName }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${VITE_URL}/nodemailerActivation/${id}`,
        { firstName, middleName, }
      );
      console.log('====>',response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default nodemailerActivationSend;

