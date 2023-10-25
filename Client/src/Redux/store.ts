import { configureStore } from '@reduxjs/toolkit';
import managerLogin from './manager.slice';

const store = configureStore({
  reducer: {
    managerLogin,
  },
});

export default store;
