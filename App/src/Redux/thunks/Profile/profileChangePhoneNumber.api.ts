import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

interface RequestData {
  newPhoneNumber: string | null;
  token?: string | undefined;
}
interface ResponseData {
  phoneNumber: string | '';
  message: string | '';
}
const profileChangePhoneNumber = createAsyncThunk<ResponseData, RequestData>(
  'api/profileChangePhoneNumber',

  async ({ newPhoneNumber, token }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/changePhoneNumber`,
        { newPhoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.error(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
);

export default profileChangePhoneNumber;