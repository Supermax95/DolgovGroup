// import axios from 'axios';
// import { userLogout } from '../User/logout.api';

// const axiosInstance = axios.create();

// function setupInterceptors(token: string, dispatch: any) {
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       if (error.response && error.response.status === 401) {
//         if (token) {
//           await dispatch(userLogout({ token }));
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// }

// export { axiosInstance, setupInterceptors };


import axios from 'axios';
import { userLogout } from '../User/logout.api';

const axiosInstance = axios.create();

function setupInterceptors(token: string, dispatch: any) {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        if (token) {
          await dispatch(userLogout({ token }));
        }
      }
      return Promise.reject(error);
    }
  );
}

export { axiosInstance, setupInterceptors };
