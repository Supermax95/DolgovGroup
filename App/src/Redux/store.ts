import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import profileSlice from './profile.slice';
import locationsUserSlice from './locations.slice'

const store = configureStore({
  reducer: {
    userSlice,
    profileSlice,
    locationsUserSlice
  },
});

export default store;
