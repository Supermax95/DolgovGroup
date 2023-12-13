import { VITE_URL } from '../../../VITE_URL';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getEmployees = createAsyncThunk('admin/getemployees', async () => {
  const response: AxiosResponse = await axios.get(
    `${VITE_URL}/admin/employees`
  );
  return response.data;
});

export default getEmployees;
