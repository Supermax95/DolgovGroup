import { createSlice } from '@reduxjs/toolkit';
import getProfileInfo from './thunks/Profile/profileInfo.api';
import { IUser } from 'Types/IUser';

const initialState: IUser = {
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  email: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        // Здесь мы можем обновить свойства профиля с данными из action.payload
        const { lastName, firstName, middleName, birthDate, email } =
          action.payload;
        state.lastName = lastName;
        state.firstName = firstName;
        state.middleName = middleName;
        state.birthDate = birthDate;
        state.email = email;
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        state.isLoading = false;
        //! Обработка ошибок, например, установка значений по умолчанию или вывод ошибки.
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
