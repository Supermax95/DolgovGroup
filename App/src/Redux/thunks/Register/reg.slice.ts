// import { createSlice } from '@reduxjs/toolkit';
// import register from './reg.api'; 

// const regSlice = createSlice({
//   name: 'reg',
//   initialState: {
//     user: null,
//     isLoading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => { 
//         state.isLoading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => { 
//         state.isLoading = false;
//         state.user = action.payload;
//       })
//       .addCase(register.rejected, (state, action) => { 
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default regSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';
import register from './reg.api'; 

const regSlice = createSlice({
  name: 'reg',
  initialState: {
    token: null,
    // isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => { 
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => { 
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default regSlice.reducer;



