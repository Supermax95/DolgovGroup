import { createSlice } from '@reduxjs/toolkit';
import register from './reg.api'; 

const regSlice = createSlice({
  name: 'auth',
  initialState: {
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
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => { 
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default regSlice.reducer;
