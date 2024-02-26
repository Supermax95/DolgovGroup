import { createSlice } from '@reduxjs/toolkit';
import getLocations from './thunks/Locations/getLocations.api';
import editLocation from './thunks/Locations/editLocation.api';
import deleteLocation from './thunks/Locations/deleteLocation.api';
import addLocation from './thunks/Locations/addLocation.api';

interface Location {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
  invisible: boolean;
}

interface LocationsState {
  data: Location[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
}

const initialState: LocationsState = {
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
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
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при удалении';
      })
      .addCase(addLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при добавлении';
      });
  },
});

export default locationsSlice.reducer;
