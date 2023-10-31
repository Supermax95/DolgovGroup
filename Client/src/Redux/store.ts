import { configureStore } from '@reduxjs/toolkit';
import locationsSlice from './locations.slice';
import managerSlice from './manager.slice'
import usersSlice from './user.slice';

const store = configureStore({
  reducer: {
    locationsSlice,
    managerSlice,
    usersSlice
  },
});

export default store;
