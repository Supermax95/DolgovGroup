
import { createSlice } from '@reduxjs/toolkit';
import auth from './auth.api';
import { IUser } from 'Types/IUser';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user; 
        state.isAuth = true;
      })
      .addCase(auth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: '',
//     user: {},
//     isAuth: false,
//     isLoading: false,
//   },
//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuth = true;
//     },
//     clearAuthData: (state) => {
//       state.token = '';
//       state.user = {};
//       state.isAuth = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(auth.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(auth.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//         state.isAuth = true;
//       })
//       .addCase(auth.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setToken, setUser, clearAuthData } = authSlice.actions;

// export default authSlice.reducer;
