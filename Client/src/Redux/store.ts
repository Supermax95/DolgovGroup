// import { configureStore, combineReducers } from '@reduxjs/toolkit';

// // import {
// //   persistStore,
// //   persistReducer,
// //   FLUSH,
// //   REHYDRATE,
// //   PAUSE,
// //   PERSIST,
// //   PURGE,
// //   REGISTER,
// // } from 'reduxjs-toolkit-persist';
// // import storage from 'reduxjs-toolkit-persist/lib/storage';

// import locationsSlice from './locations.slice';
// import managerSlice from './manager.slice';
// import usersSlice from './user.slice';
// import productSlice from './products.slice';
// import categorySlice from './category.slice';
// import subcategorySlice from './subcategory.slice';
// import promotionSlice from './promotions.slice';
// import lawsSlice from './laws.slice';

// // const rootReducer = combineReducers({
// //   locationsSlice,
// //   managerSlice,
// //   usersSlice,
// // });

// //* чтобы работал локальный стор, это в коммент с 32 по 38, остальное расскоментить, что в комменте
// const store = configureStore({
//   reducer: {
//     locationsSlice,
//     managerSlice,
//     usersSlice,
//     productSlice,
//     categorySlice,
//     subcategorySlice,
//     promotionSlice,
//     lawsSlice,
//   },
// });

// // const store = configureStore({
// //   reducer: persistedReducer,
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: {
// //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// //       },
// //     }),
// // });

// // export const persistor = persistStore(store);

// export default store;

// //! фильтрация того, что можно положить в локальный стор: ищи по названию Blacklist & Whitelist
// //! https://www.npmjs.com/package/reduxjs-toolkit-persist

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import locationsSlice from './locations.slice';
import managerSlice from './manager.slice';
import usersSlice from './user.slice';
import productSlice from './products.slice';
import categorySlice from './category.slice';
import subcategorySlice from './subcategory.slice';
import promotionSlice from './promotions.slice';
import lawsSlice from './laws.slice';

const rootReducer = combineReducers({
  locationsSlice,
  managerSlice,
  usersSlice,
  productSlice,
  categorySlice,
  subcategorySlice,
  promotionSlice,
  lawsSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist:[  'locationsSlice',
    'usersSlice',
   'productSlice',
    'categorySlice',
    'subcategorySlice',
    'promotionSlice',
   'lawsSlice']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
