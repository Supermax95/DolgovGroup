// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios, { AxiosResponse } from 'axios';
// import { VITE_URL } from '../../../VITE_URL';

// interface RequestData {
//   productId: number;
//   newInfo: {
//     id: number;
//     productName: string;
//     promoStartDate: string;
//     promoEndDate: string;
//     originalPrice: number;
//     customerPrice: number;
//     employeePrice: number;
//     isNew: boolean;
//     isDiscounted: boolean;
//     description: string;
//     subcategoryId: number;
//   };
//   file: File | null;
// }

// interface ResponseData {
//   id:number,
//   productName:string,
//   promoStartDate: string,
//   promoEndDate: string,
//   originalPrice: number,
//   customerPrice: number,
//   employeePrice: number,
//   isNew: boolean,
//   isDiscounted: boolean,
//   description: string,
//   photo: string,
//   subcategoryId: number,
// }

// type ArrayResponseData = Array<ResponseData>;

// const editProduct = createAsyncThunk<ArrayResponseData, RequestData>(
//   'admin/uploadsProduct',
//   async ({ productId, file, newInfo }) => {
//     try {
//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);
//         Object.entries(newInfo).forEach(([key, value]) => {
//           formData.append(key, String(value));
//         });

//         const response: AxiosResponse<ArrayResponseData>  = await axios.put(
//           `${VITE_URL}//admin/products/${productId}`,
//           formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//             withCredentials: true,
//           }
//         );

//         return response.data;
//       } else {
//         throw new Error('No file provided');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       throw new Error('Error uploading file');
//     }
//   }
// );

// export default editProduct;
