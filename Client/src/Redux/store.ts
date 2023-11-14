import { configureStore, combineReducers } from '@reduxjs/toolkit';

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'reduxjs-toolkit-persist';
// import storage from 'reduxjs-toolkit-persist/lib/storage';

import locationsSlice from './locations.slice';
import managerSlice from './manager.slice';
import usersSlice from './user.slice';
import productsSlice from './products.slice';

// const rootReducer = combineReducers({
//   locationsSlice,
//   managerSlice,
//   usersSlice,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

//* чтобы работал локальный стор, это в коммент с 32 по 38, остальное расскоментить, что в комменте
const store = configureStore({
  reducer: {
    locationsSlice,
    managerSlice,
    usersSlice,
    productsSlice
  },
});

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

export default store;

//! фильтрация того, что можно положить в локальный стор: ищи по названию Blacklist & Whitelist
//! https://www.npmjs.com/package/reduxjs-toolkit-persist
