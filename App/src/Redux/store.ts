import { configureStore } from '@reduxjs/toolkit';
import regSlice from './thunks/Register/reg.slice';

const store = configureStore({
  reducer: {
    regSlice,

  },
});

export default store;
