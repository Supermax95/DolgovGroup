import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'Types/IUser';
import getProfileInfo from './thunks/Profile/profileInfo.api';
import changeProfilePass from './thunks/Profile/profileChangePass.api';
import profileChangeBirthDate from './thunks/Profile/profileChangeBirthDate.api';

const initialState: IUser = {
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  email: '',
  isLoading: false,
  error: null,
  successMessage: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Сброс ошибки при загрузке
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
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
        state.error = action.error.message;
      })
      .addCase(changeProfilePass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeProfilePass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(changeProfilePass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(profileChangeBirthDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileChangeBirthDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.birthDate = action.payload.birthDate;
      })
      .addCase(profileChangeBirthDate.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default profileSlice.reducer;
