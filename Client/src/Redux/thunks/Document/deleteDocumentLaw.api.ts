import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { VITE_URL } from '../../../VITE_URL';
import { axiosInstance } from '../Logout401/axios.api';

interface ResponseData {
  id: number;
  title: string;
  description: string;
  documentLink: string;
  dateFrom: string;
  updatedAt: Date;
}

type ArrayResponseData = Array<ResponseData>;

const deleteDocumentLaw = createAsyncThunk<ArrayResponseData, number>(
  'admin/deleteDocumentLaw',

  async (lawId) => {
    try {
      const response: AxiosResponse = await axiosInstance.delete(
        `${VITE_URL}/admin/laws/doc/${lawId}`,
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

export default deleteDocumentLaw;
