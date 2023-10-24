import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import profileSlice from './profile.slice';

const store = configureStore({
  reducer: {
    userSlice,
    profileSlice,
  },
});

export default store;
