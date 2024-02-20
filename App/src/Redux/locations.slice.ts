import { createSlice } from '@reduxjs/toolkit';
import getUserLocations from './thunks/Shops/locationsUser.api';


interface LocationUser {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

interface LocationsUserState {
  data: LocationUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LocationsUserState = {
  data: [],
  isLoading: false,
  error: null,
};

const locationsUserSlice = createSlice({
  name: 'userLocations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLocations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        console.log('=====>', state.data);
        
      })
      .addCase(getUserLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
    },
});

export default locationsUserSlice.reducer;
