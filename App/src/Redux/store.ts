import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import userSlice from './user.slice';
import profileSlice from './profile.slice';
import locationsUserSlice from './locations.slice';
import categorySlice from './category.slice';
import subcategorySlice from './subcategory.slice';
import productSlice from './product.slice';
import promotiosSlice from './promotions.slice';
import lawSlice from './law.slice';
import questionSlice from './questions.slice';

const reducers = combineReducers({
  userSlice,
  profileSlice,
  locationsUserSlice,
  categorySlice,
  subcategorySlice,
  productSlice,
  promotiosSlice,
  lawSlice,
  questionSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'profileSlice',
    'locationsUserSlice',
    'categorySlice',
    'subcategorySlice',
    'productSlice',
    'promotiosSlice',
    'lawSlice',
    'questionSlice',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
