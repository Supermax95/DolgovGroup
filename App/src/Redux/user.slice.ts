import { createSlice } from '@reduxjs/toolkit';
import userRegister from './thunks/User/reg.api';
import userLogout from './thunks/User/logout.api';
import userLogin from './thunks/User/login.api';
import userActivate from './thunks/User/activated.api';
import resetPassword from './thunks/User/newPassword.api';
import refreshToken from './thunks/User/refresh.api';
import getCheck from './thunks/User/check.api';
import checkEmployee from './thunks/Support/checkEmployee.api';
import getBarcode from './thunks/User/barcode.api';
import getUserStatus from './thunks/User/userStatus.api';

type User = {
  id: number | undefined;
  firstName: string;
  email: string;
  isActivated: boolean | undefined;
  userStatus: string | undefined;
  barcode: string | undefined;
};

type IToken =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | undefined;

type UserState = {
  token: IToken | undefined;
  user: User | undefined;
  isAuth: boolean | null;
  isLoading: boolean;
  error: undefined | string;
  activationError: undefined | string;
};

const initialState: UserState = {
  token: {
    accessToken: '',
    refreshToken: '',
  },
  user: {
    email: '',
    userStatus: '',
    firstName: '',
    barcode: '' || undefined,
    id: 0 || undefined,
    isActivated: null || undefined,
  },
  isAuth: false,
  isLoading: false,
  error: undefined,
  activationError: undefined,
  // email:'',
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
          refreshToken: action.payload.refreshToken || '',
        };
        state.user = action.payload.user;
        state.activationError = action.payload.activationError;
        state.isAuth = true;
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
        // state.error = action.payload;
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
          userStatus: '',
          barcode: '',
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
        state.user.email = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
      })
      .addCase(getCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.id = action.payload.id;
        state.user.isActivated = action.payload.isActivated || undefined;
        state.user.userStatus = action.payload.userStatus || undefined;
        console.log(' state.usergetCheck=======>', state.user);
      })
      // .addCase(getCheck.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user.id = action.payload;
      //   state.user.isActivated = action.payload || undefined;
      // })
      .addCase(getCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.id = action.payload.updatedUser.id;
        state.user.isActivated =
          action.payload.updatedUser.isActivated || undefined;
        state.user.userStatus =
          action.payload.updatedUser.userStatus || undefined;
      })
      .addCase(checkEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(checkEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBarcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.barcode = action.payload.barcode;
      })
      .addCase(getBarcode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getBarcode.pending, (state) => {
        state.isLoading = true;
      })
      // userStatus
      .addCase(getUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.userStatus = action.payload.userStatus || undefined;
        console.log(' state.usergetCheck=======>', state.user);
      })
      .addCase(getUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getUserStatus.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default userSlice.reducer;
