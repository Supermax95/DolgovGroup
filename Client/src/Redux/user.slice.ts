import { createSlice } from '@reduxjs/toolkit';
import getClients from './thunks/Users/getClients.api';
import editClients from './thunks/Users/editClients.api';
import editEmployees from './thunks/Users/editEmployee.api';
import getEmployees from './thunks/Users/getEmployee.api';

interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  isActivated: boolean;
}

interface UserState {
  data: User[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
}

const initialState: UserState = {
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(editClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(editClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при редактировании';
      })
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(editEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(editEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при редактировании';
      });
  },
});

export default usersSlice.reducer;