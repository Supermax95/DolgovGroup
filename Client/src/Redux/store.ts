import { configureStore } from '@reduxjs/toolkit';
import locationsSlice from './locations.slice';
import managerLogin from './manager.slice';

const store = configureStore({
  reducer: {
    locationsSlice,
    managerLogin,
  },
});

export default store;
