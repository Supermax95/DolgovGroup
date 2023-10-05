import { configureStore } from '@reduxjs/toolkit';
import regSlice from './thunks/Register/reg.slice';
import authSlice from './thunks/Auth/auth.slice';


const store = configureStore({
  reducer: {
    regSlice,
    authSlice
  },
});

export default store;
