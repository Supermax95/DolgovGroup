import { PORT, IP } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const getUserLocations = createAsyncThunk('api/getuserlocations', async () => {
  const response: AxiosResponse = await axios.get(
    `http://${IP}:${PORT}/userlocations`
  );  
  return response.data;

});

export default getUserLocations;
