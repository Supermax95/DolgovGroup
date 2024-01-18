import { createSlice } from '@reduxjs/toolkit';
import userRegister from './thunks/User/reg.api';
import userLogout from './thunks/User/logout.api';
import userLogin from './thunks/User/login.api';
import userActivate from './thunks/User/activated.api';
import resetPassword from './thunks/User/newPassword.api';
import refreshToken from './thunks/User/refresh.api';

type User = {
  email: string;
  firstName: string;
  id: number;
  isActivated: boolean;
};

type IToken =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | undefined;

type UserState = {
  token: IToken | undefined;
  user: User;
  isAuth: boolean;
  isLoading: boolean;
  error: any; //* указать конкретный тип для ошибок, если он известен
  email: string;
};

const initialState: UserState = {
  token: {
    accessToken: '',
    refreshToken: '',
  },
  user: {
    email: '',
    firstName: '',
    id: 0,
    isActivated: false,
  },
  isAuth: false,
  isLoading: false,
  error: null,
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
        state.isAuth = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload) state.isLoading = false;
        state.token = {
          accessToken: action.payload.accessToken || '',
          refreshToken: '',
        };
        state.user = action.payload.user;
        state.isAuth = true;
        console.log('tokenslice', state.token);
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
        state.user = action.payload.user;
        state.isAuth = true;
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
        state.token = {
          accessToken: '',
          refreshToken: '',
        };
        state.user = {
          email: '',
          firstName: '',
          id: 0,
          isActivated: false,
        };
        state.isAuth = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userActivate.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(userActivate.fulfilled, (state, action) => {
        if (action.payload) state.user = action.payload.user;
        state.isLoading = false;
        state.isAuth = true;
        state.token = {
          accessToken: action.payload?.token?.accessToken || '',
          refreshToken: action.payload?.token?.refreshToken || '',
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
        state.email = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = {
          accessToken: action.payload?.accessToken || '',
          refreshToken: action.payload?.refreshToken || '',
        };
        state.user = action.payload.user;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
