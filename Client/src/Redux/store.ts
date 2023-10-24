import { configureStore } from '@reduxjs/toolkit';
import locationsSlice from './locations.slice';

const store = configureStore({
  reducer: {
    locationsSlice,
  },
});

export default store;
