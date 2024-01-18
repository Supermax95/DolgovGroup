import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import profileSlice from './profile.slice';
import locationsUserSlice from './locations.slice'
import categorySlice from './category.slice';
import subcategorySlice from './subcategory.slice';
import productSlice from './product.slice';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' 

const store = configureStore({
  reducer: {
    userSlice,
    profileSlice,
    locationsUserSlice,
    categorySlice,
    subcategorySlice,
    productSlice,
  },
});

export default store;
