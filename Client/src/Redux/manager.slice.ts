import { createSlice } from '@reduxjs/toolkit';
import portalLogin from './thunks/PortalLogin/portalLogin.api';
import portalLogout from './thunks/PortalLogin/portalLogout.api';

export interface IManager {
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
  message: string;
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
  message: '',
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
        //state.manager.isAdmin = action.payload.manager.isAdmin;
        state.manager = action.payload.manager;
        console.log(' action.payload', action.payload);
      })
      .addCase(portalLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(portalLogout.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(portalLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.manager = action.payload.manager;
      })
      .addCase(portalLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default managerSlice.reducer;
