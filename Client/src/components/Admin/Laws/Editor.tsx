// import React, { ChangeEvent, FC, useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
// import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
// import Wrapper from '../../../ui/Wrapper';
// import { ILaw } from './Laws';
// import { VITE_URL } from '../../../VITE_URL';
// import axios from 'axios';
// import 'react-quill/dist/quill.snow.css'; 
// import ReactQuill from 'react-quill';

// interface LawEditorProps {
//   isOpen: boolean;
//   law: ILaw | null;
//   onSaveAdd: (editedLaw: ILaw) => void;
//   onSaveEdit:  (editedLaw: ILaw) => void;
//   onCloseAddEditor: () => void;
//   onCloseEditEditor: () => void;
//   isAddingMode: boolean;
//   editedLaw: ILaw | null | undefined;
//   setEditedLaw: React.Dispatch<
//     React.SetStateAction<ILaw | null | undefined>
//   >;
//   axiosError: string | null;
//   resetAxiosError: () => void;
// }

// const Editor: FC<LawEditorProps> = ({
//   isOpen,
//   law,
//   onSaveEdit,
//   onSaveAdd,
//   onCloseAddEditor,
//   onCloseEditEditor,
//   isAddingMode,
//   editedLaw,
//   setEditedLaw,
//   axiosError,
//   resetAxiosError,
// }) => {
//   const id = useAppSelector((state) => state.lawsSlice.postId);
//   const dispatch = useAppDispatch();
//   const [isUpload, setUpload] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   useEffect(() => {
//     if (law) {
//       setEditedLaw({ ...law });
//     }
//   }, [law, isAddingMode, setEditedLaw]);
//   const EditorTitle = isAddingMode ? 'Новый документ' : 'Редактирование документа';
//   const handleCancel = () => {
//     setEditedLaw(undefined);
//     resetAxiosError();
//     onCloseEditEditor();
//     onCloseAddEditor();
//   };

//   const uploadFile = async (
//     file: File,
//     id: number | 0,
//     isAddingMode: boolean
//   ): Promise<void> => {
//     if (file && id) {
//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         await axios.put(`${VITE_URL}/admin/documentFile/${id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         });

//         if (isAddingMode) {
//             onCloseAddEditor();
//         } else {
//             onCloseEditEditor();
//         }
//       } catch (error) {
//         console.error('Ошибка при загрузке файла:', error);
//       }
//     }
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (currentStep === 1) {
//       let result = '';
//       let result2 = '';

//       if (isAddingMode) {
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         result = await onSaveAdd(editedLaw as ILaw);
//       } else {
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         result2 = await onSaveEdit(editedLaw as ILaw);
//       }

//       if (typeof result2 !== 'string') {
//         setCurrentStep(2);
//         setUpload(true);
//       }
//       if (typeof result !== 'string') {
//         setCurrentStep(2);
//         setUpload(true);
//       }
//     } else if (currentStep === 2) {
//       const fileInput = document.getElementById(
//         'fileInput'
//       ) as HTMLInputElement;
//       const file = fileInput?.files?.[0];

//       await uploadFile(
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         file,
//         id,
//         isAddingMode
//       );
//     }
//   };

//   const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0] || null;

//     uploadFile(
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       file,
//       id,
//       isAddingMode
//     );
//   };

//   const handleDelete = () => {
//     if (editedLaw && editedLaw.id) {
//       const productId = editedLaw.id;
//       dispatch(deleteProduct(productId));
//       onCloseEditEditor();
//     }
//   };

//   if (!isOpen || !editedLaw) {
//     return null;
//   }

// return (
//     <Wrapper>
//     <form onSubmit={handleFormSubmit}>
//           {currentStep === 1 && (
//             <div className="flex space-x-2 items-center justify-between pb-4">
//               <div className="flex space-x-2">
//                 <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
//                   Новый
//                 </h1>
//                 <ReactQuill
//                 id="description"
//                 theme="snow"
//                 value={editedLaw.description}
//                 onChange={(value) =>
//                   setEditedProduct({ ...editedLaw, description: value })
//                 }
//                 // placeholder="Описание продукта"
//                 className="w-full" /* Чтобы растягиваться по ширине контейнера */
//               />
//             </div>
//           )}

    
//           {currentStep === 2 && (
//             <>
//               <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-m">
//                 <div className="px-4 sm:px-0 text-center">
//                   <h1 className="text-xl font-bold mb-4">
//                     Форма загрузки документа
//                   </h1>
//                   <span className="block mt-2 text-sm text-gray-500">
//                     Если документ менять не нужно, вы можете
//                     пропустить этот шаг
//                   </span>
//                   <div className="mt-6">
//                     <div className="mb-4">
//                       <input
//                         type="file"
//                         id="fileInput"
//                         name="productPhoto"
//                         className="hidden"
//                         onChange={handleFileInputChange}
//                       />
//                       <label
//                         htmlFor="fileInput"
//                         className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                       >
//                         Выберите файл
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//       </form>
//     </Wrapper>
//   );
// };

// export default Editor;




import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
import Wrapper from '../../../ui/Wrapper';
import { ILaw } from './Laws';
import { VITE_URL } from '../../../VITE_URL';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface LawEditorProps {
  isOpen: boolean;
  law: ILaw | null;
  onSaveAdd: (editedLaw: ILaw) => void;
  onSaveEdit: (editedLaw: ILaw) => void;
  onCloseAddEditor: () => void;
  onCloseEditEditor: () => void;
  isAddingMode: boolean;
  editedLaw: ILaw | null | undefined;
  setEditedLaw: React.Dispatch<React.SetStateAction<ILaw | null | undefined>>;
  axiosError: string | null;
  resetAxiosError: () => void;
}

const Editor: FC<LawEditorProps> = ({
  isOpen,
  law,
  onSaveEdit,
  onSaveAdd,
  onCloseAddEditor,
  onCloseEditEditor,
  isAddingMode,
  editedLaw,
  setEditedLaw,
  axiosError,
  resetAxiosError,
}) => {
  const id = useAppSelector((state) => state.lawsSlice.postId);
  const dispatch = useAppDispatch();
  const [isUpload, setUpload] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (law) {
      setEditedLaw({ ...law });
    }
  }, [law, isAddingMode, setEditedLaw]);

  const handleCancel = () => {
    setEditedLaw(undefined);
    resetAxiosError();
    onCloseEditEditor();
    onCloseAddEditor();
  };

  const uploadFile = async (
    file: File,
    id: number | 0,
    isAddingMode: boolean
  ): Promise<void> => {
    if (file && id) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.put(`${VITE_URL}/admin/documentFile/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (isAddingMode) {
          onCloseAddEditor();
        } else {
          onCloseEditEditor();
        }
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      let result = '';
      let result2 = '';

      if (isAddingMode) {
           //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result = await onSaveAdd(editedLaw as ILaw);
      } else {
                   //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result2 = await onSaveEdit(editedLaw as ILaw);
      }

      if (typeof result2 !== 'string') {
        setCurrentStep(2);
        setUpload(true);
      }
      if (typeof result !== 'string') {
        setCurrentStep(2);
        setUpload(true);
      }
    } else if (currentStep === 2) {
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
           //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      await uploadFile(file, id, isAddingMode);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
           //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    uploadFile(file, id, isAddingMode);
  };

    const handleDelete = () => {
    if (editedLaw && editedLaw.id) {
      const productId = editedLaw.id;
      dispatch(deleteProduct(productId));
      onCloseEditEditor();
    }
  };

  if (!isOpen || !editedLaw) {
    return null;
  }

  return (
    <Wrapper>
      <form onSubmit={handleFormSubmit}>
        {currentStep === 1 && (
          <div className="flex space-x-2 items-center justify-between pb-4">
            <div className="flex space-x-2">
              <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                Новый
              </h1>
              <ReactQuill
                theme="snow"
                value={editedLaw.description}
                onChange={(value) =>
                  setEditedLaw({ ...editedLaw, description: value })
                }
                className="w-full"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <>
            <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-m">
              <div className="px-4 sm:px-0 text-center">
                <h1 className="text-xl font-bold mb-4">
                  Форма загрузки документа
                </h1>
                <span className="block mt-2 text-sm text-gray-500">
                  Если документ менять не нужно, вы можете пропустить этот шаг
                </span>
                <div className="mt-6">
                  <div className="mb-4">
                    <input
                      type="file"
                      id="fileInput"
                      name="documentLink"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Выберите файл
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </Wrapper>
  );
};

export default Editor;
