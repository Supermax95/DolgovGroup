import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  newBirthDate: Date | null | string;
  userId: number;
}
interface ResponseData {
  birthDate: Date | null | string;
}
const profileChangeBirthDate = createAsyncThunk<ResponseData,RequestData>(
  'api/profileChangeBirthDate',

  async ({ userId, newBirthDate }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/calendar/${userId}`,
        { newBirthDate }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default profileChangeBirthDate;
