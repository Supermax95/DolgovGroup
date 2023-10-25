import { createSlice } from '@reduxjs/toolkit';
import portalLogin from './thunks/PortalLogin/PortalLogin.api';

interface IManager {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null | string;
  email: string;
  isAdmin: boolean;
}

interface managerState {
  manager: IManager;
  isAuth: boolean;
  isLoading: boolean;
  error: unknown;
}

const initialState: managerState = {
  manager: {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: null,
    email: '',
    isAdmin: false,
  },
  isAuth: false,
  isLoading: false,
  error: null,
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(portalLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(portalLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.manager = action.payload.manager;
      })
      .addCase(portalLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default managerSlice.reducer;
