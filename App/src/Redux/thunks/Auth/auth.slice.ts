// import { createSlice } from '@reduxjs/toolkit';
// import auth from './auth.api'; 

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null,
//     user: null,
//     isAuthenticated: false,
//     isLoading: false,
//   },
//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;
//       state.isAuthenticated = true;
//     },
//     removeToken: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//     },
// },

//     extraReducers: (builder) => {
//         builder
//           .addCase(auth.pending, (state) => { 
//             state.isLoading = true;
//           })
//           .addCase(auth.fulfilled, (state, action) => { 
//             state.isLoading = false;
//             state.user = action.payload;
//           })
//           .addCase(auth.rejected, (state, action) => { 
//             state.isLoading = false;
//             state.error = action.error.message;
//           });
//       },
//     });
// export const { setToken, removeToken } = authSlice.actions;


// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// export default authSlice.reducer;


// Ваш срез (slice)
import { createSlice } from '@reduxjs/toolkit';
import auth from './auth.api';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
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
        state.isAuthenticated = true;
      })
      .addCase(auth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
