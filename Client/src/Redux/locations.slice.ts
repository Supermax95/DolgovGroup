import { createSlice } from '@reduxjs/toolkit';
import getLocations from './thunks/Locations/getLocations.api';
import editLocation from './thunks/Locations/editLocation.api';

interface Location {
  id: number;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: string;
}

interface LocationsState {
  data: Location[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LocationsState = {
  data: [],
  isLoading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(editLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;        
      })
      .addCase(editLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при редактировании';
      });
  },
});

export default locationsSlice.reducer;
