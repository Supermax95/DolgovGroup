import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';

const store = configureStore({
  reducer: {
    userSlice,
  },
});

export default store;
