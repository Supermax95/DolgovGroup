import { createSlice } from '@reduxjs/toolkit';
import userRegister from './thunks/User/reg.api';
import userLogout from './thunks/User/logout.api';
import userLogin from './thunks/User/login.api';
import userActivate from './thunks/User/activated.api';
import resetPassword from './thunks/User/newPassword.api';

const initialState = {
  token: '',
  user: '',
  isAuth: false,
  isLoading: false,
  error: null,
  isActivated: false,
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.token = '';
        state.user = '';
        state.isAuth = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userActivate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActivate.fulfilled, (state, action) => {
        state.isActivated = action.payload;
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = {
          ...state.user,
          ...action.payload.newUser,
        };
      })
      .addCase(userActivate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
