import { configureStore } from '@reduxjs/toolkit';
import locationsSlice from './locations.slice';
import managerSlice from './manager.slice'

const store = configureStore({
  reducer: {
    locationsSlice,
    managerSlice,
  },
});

export default store;
