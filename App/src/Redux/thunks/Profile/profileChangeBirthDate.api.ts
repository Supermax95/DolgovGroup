import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { PORT, IP } from '@env';

const profileChangeBirthDate = createAsyncThunk(
  'api/profileChangeBirthDate',
  
  async ({ userId, newBirthDate }) => {
    console.log('===>', newBirthDate)
    try {
      const response: AxiosResponse = await axios.put(
        `http://${IP}:${PORT}/calendar/${userId}`,
        { newBirthDate }
      );
      // console.log('responseresponseresponseresponseresponseresponseresponse', response);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export default profileChangeBirthDate;
