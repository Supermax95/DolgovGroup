import { createSlice } from '@reduxjs/toolkit';
import portalLogin from './thunks/PortalLogin/portalLogin.api';
import portalLogout from './thunks/PortalLogin/portalLogout.api';
import portalCheck from './thunks/PortalLogin/portalCheck';
import editProfileManager from './thunks/Manager/profileManager.api';
import changePassword from './thunks/Manager/changePassword.api';
import changeEmailAdmin from './thunks/Manager/changeEmailAdmin.api';
import getManager from './thunks/Manager/Management/getManager.api';
import addManager from './thunks/Manager/Management/addManager.api';
import editManager from './thunks/Manager/Management/editManager.api';
import sendOneTimePassword from './thunks/Manager/Management/sendOneTimePassword.api';
import deleteManager from './thunks/Manager/Management/deleteManager.api';
import changePhone from './thunks/Manager/changePhone.api';
import getManagerInfo from './thunks/Manager/getManagerInfo.api';
import resetPassword from './thunks/PortalLogin/portalResetPassword.api';

export interface IManager {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

interface managerState {
  manager: IManager;
  data: IManager[]; //* используется массив для таблицы в кабинете админа
  info: IManager[]; //* используется массив для таблицы в кабинете маркетолога
  resultPass: IManager;
  isAuth: boolean;
  isLoading: boolean;
  message: string;
  error: unknown;
}

const initialState: managerState = {
  manager: {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    isAdmin: false,
  },
  resultPass: {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    isAdmin: false,
  },
  data: [],
  info: [],
  isAuth: false,
  isLoading: false,
  message: '',
  error: null,
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(portalLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(portalLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        //* выводит информацию при логине в userMenu
        state.manager.id = action.payload.id;
        state.manager.isAdmin = action.payload.isAdmin;
        state.manager.lastName = action.payload.lastName;
        state.manager.firstName = action.payload.firstName;
        state.manager.middleName = action.payload.middleName;
        state.manager.phone = action.payload.phone;
        state.manager.email = action.payload.email;
      })
      .addCase(portalLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* portalCheck
      .addCase(portalCheck.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(portalCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        //* предзаполняет поля в инпутах в ЛК
        state.manager.id = action.payload.id;
        state.manager.isAdmin = action.payload.isAdmin;
        state.manager.lastName = action.payload.lastName;
        state.manager.firstName = action.payload.firstName;
        state.manager.middleName = action.payload.middleName;
        state.manager.phone = action.payload.phone;
        state.manager.email = action.payload.email;
      })
      .addCase(portalCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.manager = {
          id: 0,
          lastName: '',
          firstName: '',
          middleName: '',
          phone: '',
          email: '',
          isAdmin: false,
        };
        state.error = action.error.message;
      })
      //* //* resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* portalLogout
      .addCase(portalLogout.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(portalLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.manager = {
          id: 0,
          lastName: '',
          firstName: '',
          middleName: '',
          phone: '',
          email: '',
          isAdmin: false,
        };
        state.message = action.payload.message;
      })
      .addCase(portalLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // ? getManagerInfo
      .addCase(getManagerInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getManagerInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload;
      })
      .addCase(getManagerInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* editMan
      .addCase(editProfileManager.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(editProfileManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        const { lastName, firstName, middleName } = action.payload;
        state.manager.lastName = lastName;
        state.manager.firstName = firstName;
        state.manager.middleName = middleName;
        state.message = action.payload.message;
      })
      .addCase(editProfileManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* email
      .addCase(changeEmailAdmin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(changeEmailAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.manager.email = action.payload.email;
        state.message = action.payload.message;
      })
      .addCase(changeEmailAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //* phone
      .addCase(changePhone.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(changePhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.manager.phone = action.payload.phone;
        state.message = action.payload.message;
      })
      .addCase(changePhone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //! getManagerData
      .addCase(getManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //! addManager
      .addCase(addManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.managers;
      })
      .addCase(addManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //! editManager
      .addCase(editManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.managers;
      })
      .addCase(editManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //! sendOneTimePassword
      .addCase(sendOneTimePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOneTimePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.resultPass = action.payload.resultPass;
      })
      .addCase(sendOneTimePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //! deleteManager
      .addCase(deleteManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default managerSlice.reducer;
