import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  newBirthDate: Date | null | string;
  token?: string | undefined;
}
interface ResponseData {
  birthDate: Date | null | string;
}
const profileChangeBirthDate = createAsyncThunk<ResponseData, RequestData>(
  'api/profileChangeBirthDate',

  async ({ newBirthDate, token }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/calendar`,
        { newBirthDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default profileChangeBirthDate;
