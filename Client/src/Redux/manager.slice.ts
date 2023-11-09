import { createSlice } from '@reduxjs/toolkit';
import portalLogin from './thunks/PortalLogin/portalLogin.api';
import portalLogout from './thunks/PortalLogin/portalLogout.api';
import portalCheck from './thunks/PortalLogin/portalCheck';
import editProfileManager from './thunks/Manager/profileManager.api';
import changePassword from './thunks/Manager/changePassword.api';
import changeEmailAdmin from './thunks/Manager/changeEmailAdmin.api';

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
        state.manager = action.payload.manager;
      })
      .addCase(portalLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(portalCheck.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(portalCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.manager = action.payload.manager;
      })
      .addCase(portalCheck.rejected, (state, action) => {
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
        state.manager = {
          id: 0,
          lastName: '',
          firstName: '',
          middleName: '',
          birthDate: null,
          email: '',
          isAdmin: false,
        };
        state.message = action.payload.message;
      })
      .addCase(portalLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* editMan
      .addCase(editProfileManager.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(editProfileManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        const { lastName, firstName, middleName } = action.payload;
        state.manager.lastName = lastName;
        state.manager.firstName = firstName;
        state.manager.middleName = middleName;
        state.message = action.payload.message;
      })
      .addCase(editProfileManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.message = action.payload.message;
        console.log(state.message);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(state.error);
        console.log('Норм======>', action.error);
      })
      //* email
      .addCase(changeEmailAdmin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(changeEmailAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.manager.email = action.payload.email;
        state.message = action.payload.message;
        console.log('Норм======>', action);
      })
      .addCase(changeEmailAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(state.error);
      });
  },
});

export default managerSlice.reducer;
