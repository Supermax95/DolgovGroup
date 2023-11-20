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
  data: IManager[]; //* используется массив для таблицы
  addedManagerData: IManager;
  updatedManager: IManager;
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
  addedManagerData: {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    isAdmin: false,
  },
  updatedManager: {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    isAdmin: false,
  },
  data: [],
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
        //! добавить типизацию в компоненты
        state.manager = action.payload.manager;
      })
      .addCase(portalLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(portalCheck.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(portalCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        //! добавить типизацию в компоненты
        state.manager = action.payload.manager;
      })
      .addCase(portalCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
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
        console.log(state.message);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(state.error);
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
        console.log(state.error);
      })
      //! getManager
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
        state.addedManagerData = action.payload.addedManagerData;
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
        state.updatedManager = action.payload.updatedManager;
        console.log(' state.data', state.data);
        console.log('state.id', state);
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
        //! добавить типизацию в компоненты
        state.data = action.payload;
        console.log(' state.data ', state.data);
        console.log('action.payload ', action.payload);
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default managerSlice.reducer;
