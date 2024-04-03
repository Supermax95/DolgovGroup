import axios from 'axios';
import portalLogout from '../PortalLogin/portalLogout.api';

const axiosInstance = axios.create();

function setupInterceptors(dispatch: any) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        await dispatch(portalLogout());
      }
      return Promise.reject(error);
    }
  );
}

export { axiosInstance, setupInterceptors };
