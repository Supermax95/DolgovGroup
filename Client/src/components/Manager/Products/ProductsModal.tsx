import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import { IProduct } from './Products';
import { VITE_URL } from '../../../VITE_URL';
import axios from 'axios';

interface Product {
  id: number;
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  customerPrice: number;
  employeePrice: number;
  isNew: boolean;
  isDiscounted: boolean;
  description: string;
  photo: string;
  subcategoryId: number;
}

interface Category {
  id: number;
  categoryName: string;
}

interface Subcategory {
  id: number;
  categoryId: number;
  subcategoryName: string;
}

interface ProductsModalProps {
  isOpen: boolean;
  product: Product | null;
  onSaveAdd: (editedProduct: IProduct) => void;
  onSaveEdit: (editedProduct: IProduct) => void;
  onCloseAddModal: () => void;
  onCloseEditModal: () => void;
  isAddingMode: boolean;
  editedProduct: Product | null | undefined;
  setEditedProduct: React.Dispatch<
    React.SetStateAction<Product | null | undefined>
  >;
}

const ProductsModal: FC<ProductsModalProps> = ({
  isOpen,
  product,
  onSaveEdit,
  onSaveAdd,
  onCloseEditModal,
  onCloseAddModal,
  isAddingMode,
  editedProduct,
  setEditedProduct,
}) => {
  const subcategory = useAppSelector((state) => state.subcategorySlice.data);
  // console.log('subcategory', subcategory);

  // console.log('editedproduct', editedProduct);

  const category = useAppSelector((state) => state.categorySlice.data);
  // console.log('category', category);

  const selectedSubcategory = subcategory.find(
    (subcategory) => subcategory.id === editedProduct.subcategoryId
  );
  // console.log('selectedSubcategory', selectedSubcategory?.id);

  const selectedCategory = category.find(
    (category) => category.id === selectedSubcategory.categoryId
  );
  // console.log('selectedcategory', selectedCategory?.categoryName);

  const id = useAppSelector((state) => state.productSlice.postId);
  const dispatch = useAppDispatch();
  const [isUpload, setUpload] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [filteredSubcategories, setFilteredSubcategories] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product, isAddingMode, setEditedProduct]);

  const modalTitle = isAddingMode ? 'Новый продукт' : 'Редактирование продукта';
  

  const handleCancel = () => {
    setEditedProduct(undefined);
    onCloseEditModal();
    onCloseAddModal();
  };

  const uploadFile = async (
    file: File | null,
    id: number | undefined
    // isAddingMode?: boolean
  ): Promise<void> => {
    if (file && id) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.put(`${VITE_URL}/admin/productsPhoto/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (isAddingMode) {
          onCloseAddModal();
        } else {
          onCloseEditModal();
        }
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (isAddingMode) {
        onSaveAdd(editedProduct as IProduct);
      } else {
        onSaveEdit(editedProduct as IProduct);
      }

      setCurrentStep(2);
      setUpload(true);
    } else if (currentStep === 2) {
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];

      await uploadFile(file, id, isAddingMode);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;

    uploadFile(file, id, isAddingMode);
  };

  const handleDelete = () => {
    if (editedProduct && editedProduct.id) {
      const productId = editedProduct.id;
      dispatch(deleteProduct(productId));
      onCloseEditModal();
    }
  };

  if (!isOpen || !editedProduct) {
    return null;
  }


  const uniqueCategories = Array.from(
    new Set(category.map((cat) => cat.categoryName))
  );
  // console.log('uniqueCategories', uniqueCategories);

  const uniqueSubcategories = Array.from(
    new Set(
      subcategory
        .filter((subcat) => subcat.categoryId === selectedCategory?.id)
        .map((cat) => cat.subcategoryName)
    )
  );
  // console.log('uniqueSubcategories', uniqueSubcategories);

  const inputFields: InputField[] = [
    {
      id: 'categoryName',
      type: 'text',
      value: selectedCategory ? selectedCategory.categoryName : '',
      placeholder: '',
      autoComplete: 'off',
      title: 'Категория продукта',
      htmlFor: 'categoryName',
      onChange: (value: string) => {
        const selectedCategory = category.find(
          (cat) => cat.categoryName === value
        );
        if (selectedCategory) {
          const filteredSubcategories = subcategory.filter(
            (subcat) => subcat.categoryId === selectedCategory.id
          );

          const firstSubcategory = filteredSubcategories[0];
  
          setEditedProduct({
            ...editedProduct,
            subcategoryId: firstSubcategory ? firstSubcategory.id : '',
          });
        }
      },
      options: uniqueCategories.map((cat) => ({
        value: cat,
        label: cat,
      })),
      required: true,
    },
    {
      id: 'subcategoryId',
      type: 'text',
      value: selectedSubcategory ? selectedSubcategory.subcategoryName : '',
      placeholder: '',
      autoComplete: 'off',
      title: 'Подкатегоря продукта',
      htmlFor: 'subcategoryId',
      onChange: (value: string) => {
        const selectedSubcategory = subcategory.find(
          (subcat) => subcat.subcategoryName === value
        );
        if (selectedSubcategory) {
          setEditedProduct({
            ...editedProduct,
            subcategoryId: selectedSubcategory.id,
          });
        }
      },
      options: uniqueSubcategories.map((subcat) => ({
        value: subcat,
        label: subcat,
      })),
      required: true,
    },    
    {
      id: 'productName',
      type: 'text',
      value: editedProduct.productName,
      autoComplete: 'off',
      placeholder: '',
      title: 'Название продукта',
      htmlFor: 'productName',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          productName: value,
        }),
    },
    {
      id: 'promoStartDate',
      type: 'text',
      value: editedProduct.promoStartDate,
      autoComplete: 'off',
      placeholder: '',
      title: 'Дата начала акции',
      htmlFor: 'promoStartDate',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          promoStartDate: value,
        }),
    },
    {
      id: 'promoEndDate',
      type: 'text',
      value: editedProduct.promoEndDate,
      autoComplete: 'off',
      placeholder: '',
      title: 'Дата окончания акции',
      htmlFor: 'promoEndDate',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          promoEndDate: value,
        }),
    },
    {
      id: 'originalPrice',
      type: 'number',
      value: editedProduct.originalPrice.toString(),
      autoComplete: 'off',
      placeholder: '',
      title: 'Начальная цена',
      htmlFor: 'originalPrice',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          originalPrice: parseFloat(value),
        }),
    },
    {
      id: 'customerPrice',
      type: 'number',
      value: editedProduct.customerPrice.toString(),
      autoComplete: 'off',
      placeholder: '',
      title: 'Цена для покупателя',
      htmlFor: 'customerPrice',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          customerPrice: parseFloat(value),
        }),
    },
    {
      id: 'employeePrice',
      type: 'number',
      value: editedProduct.employeePrice.toString(),
      autoComplete: 'off',
      placeholder: '',
      title: 'Цена для сотрудника',
      htmlFor: 'employeePrice',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          employeePrice: parseFloat(value),
        }),
    },
    {
      id: 'isNew',
      type: 'select',
      value: String(editedProduct.isNew),
      htmlFor: 'isNew',
      onChange: (value: boolean) =>
        setEditedProduct({
          ...editedProduct,
          isNew: value === 'true',
        }),
      options: [
        { value: 'true', label: 'Новый' },
        { value: 'false', label: 'Старый' },
      ],
      required: true,
    },
    {
      id: 'isDiscounted',
      type: 'text',
      checked: editedProduct.isDiscounted,
      htmlFor: 'isDiscounted',
      onChange: (value: boolean) =>
        setEditedProduct({
          ...editedProduct,
          isDiscounted: value,
        }),
    },
    {
      id: 'description',
      type: 'text',
      value: editedProduct.description,
      autoComplete: 'off',
      placeholder: '',
      title: 'Описание продукта',
      htmlFor: 'description',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          description: value,
        }),
    },
  ];

  return (
    <Wrapper>
      <form onSubmit={handleFormSubmit}>
        <Modal
          modalTitle={modalTitle}
          isAddingMode={isAddingMode}
          onDeleteClick={handleDelete}
          onCancellick={handleCancel}
          isUpload={isUpload}
        >
          {currentStep === 1 && <InputModal inputFields={inputFields} />}

          {currentStep === 2 && (
            <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-md dark:bg-neutral-700">
              <div className="px-4 sm:px-0 text-center">
                <h1 className="text-2xl font-bold mb-4">
                  Форма загрузки фотографии продукта
                </h1>
                <div className="mt-6">
                  <div className="mb-4">
                    <span className="text-center block mb-1 s text-md font-medium leading-6 text-gray-900 mt-2">
                      Загрузите фотографию продукта
                    </span>
                    <input
                      type="file"
                      id="fileInput"
                      name="productPhoto"
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
          )}
        </Modal>
      </form>
    </Wrapper>
  );
};

export default ProductsModal;

// import React, { ChangeEvent, FC, useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
// import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
// import Wrapper from '../../../ui/Wrapper';
// import InputModal, { InputField } from '../../../ui/InputModal';
// import Modal from '../../../ui/Modal';
// import { IProduct } from './Products';
// import { VITE_URL } from '../../../VITE_URL';
// import editCategory from '../../../Redux/thunks/Category/editCategory.api';
// import editSubcategory from '../../../Redux/thunks/SubCategory/editSubcategory.api';
// import axios from 'axios';

// interface Product {
//   id: number;
//   productName: string;
//   promoStartDate: string;
//   promoEndDate: string;
//   originalPrice: number;
//   customerPrice: number;
//   employeePrice: number;
//   isNew: boolean;
//   isDiscounted: boolean;
//   description: string;
//   photo: string;
//   subcategoryId: number;
// }

// interface Category {
//   id: number;
//   categoryName: string;
// }

// interface Subcategory {
//   id: number;
//   categoryId: number;
//   subcategoryName: string;
// }

// interface ProductsModalProps {
//   isOpen: boolean;
//   product: Product | null;
//   onSaveAdd: (editedProduct: IProduct) => void;
//   onSaveEdit: (editedProduct: IProduct) => void;
//   onCloseAddModal: () => void;
//   onCloseEditModal: () => void;
//   isAddingMode: boolean;
//   editedProduct: Product | null | undefined;
//   setEditedProduct: React.Dispatch<
//     React.SetStateAction<Product | null | undefined>
//   >;
// }

// const ProductsModal: FC<ProductsModalProps> = ({
//   isOpen,
//   product,
//   onSaveEdit,
//   onSaveAdd,
//   onCloseEditModal,
//   onCloseAddModal,
//   isAddingMode,
//   editedProduct,
//   setEditedProduct,
// }) => {
//   const subcategory = useAppSelector((state) => state.subcategorySlice.data);
//   console.log('subcategory', subcategory);

//   console.log('editedproduct', editedProduct);

//   const category = useAppSelector((state) => state.categorySlice.data);
//   console.log('category', category);

//   const selectedSubcategory = subcategory.find(
//     (subcategory) => subcategory.id === editedProduct.subcategoryId
//   );
//   const selectedCategory = category.find(
//     (category) => category.id === selectedSubcategory.categoryId
//   );
//   console.log('selectedcategory', selectedCategory?.categoryName);
//   console.log('selectedSubcategory', selectedSubcategory?.subcategoryName);

//   const id = useAppSelector((state) => state.productSlice.postId);
//   const dispatch = useAppDispatch();
//   const [isUpload, setUpload] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [editedCategory, setEditedCategory] = useState<Category>({
//     id: 0,
//     categoryName: '',
//   });
//   const [editedSubcategory, setEditedSubcategory] = useState<Subcategory>({
//     id: 0,
//     categoryId:0,
//     subcategoryName: '',
//   });

//   useEffect(() => {
//     if (category) {
//       setEditedCategory({ ...category });
//     }
//   }, [category, setEditedCategory]);

//   useEffect(() => {
//     if (subcategory) {
//       setEditedSubcategory({ ...subcategory });
//     }
//   }, [subcategory, setEditedSubcategory]);

//   useEffect(() => {
//     if (product) {
//       setEditedProduct({ ...product });
//     }
//   }, [product, isAddingMode, setEditedProduct]);

//   const modalTitle = isAddingMode ? 'Новый продукт' : 'Редактирование продукта';

//   const handleCancel = () => {
//     setEditedProduct(undefined);
//     onCloseEditModal();
//     onCloseAddModal();
//   };

//   const uploadFile = async (
//     file: File | null,
//     id: number | undefined
//     // isAddingMode?: boolean
//   ): Promise<void> => {
//     if (file && id) {
//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         await axios.put(`${VITE_URL}/admin/productsPhoto/${id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         });

//         if (isAddingMode) {
//           onCloseAddModal();
//         } else {
//           onCloseEditModal();
//         }
//       } catch (error) {
//         console.error('Ошибка при загрузке файла:', error);
//       }
//     }
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (currentStep === 1) {
//       if (isAddingMode) {
//         onSaveAdd(editedProduct as IProduct);
//       } else {
//         onSaveEdit(editedProduct as IProduct);
//         if (editedCategory) {
//           await dispatch(editCategory({
//             categoryId:
//             newInfo: editedCategory }));
//         }

//         if (editedSubcategory) {
//           await dispatch(editSubcategory({
//             subcategoryId:editedProduct.subcategoryId
//             newInfo: editedSubcategory }));
//         }
//       }

//       setCurrentStep(2);
//       setUpload(true);
//     } else if (currentStep === 2) {
//       const fileInput = document.getElementById(
//         'fileInput'
//       ) as HTMLInputElement;
//       const file = fileInput?.files?.[0];

//       await uploadFile(file, id, isAddingMode);
//     }
//   };

//   const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0] || null;

//     uploadFile(file, id, isAddingMode);
//   };

//   const handleDelete = () => {
//     if (editedProduct && editedProduct.id) {
//       const productId = editedProduct.id;
//       dispatch(deleteProduct(productId));
//       onCloseEditModal();
//     }
//   };

//   if (!isOpen || !editedProduct) {
//     return null;
//   }

//   const uniqueCategories = Array.from(
//     new Set(category.map((cat) => cat.categoryName))
//   );
//   console.log('uniqueCategories', uniqueCategories);
//   const uniqueSubcategories = Array.from(
//     new Set(subcategory.map((cat) => cat.subcategoryName))
//   );
//   console.log('uniqueSubcategories', uniqueSubcategories);

//   const inputFields: InputField[] = [
//     {
//       id: 'categoryName',
//       type: 'text',
//       value: editedCategory.categoryName || '',
//       placeholder: '',
//       autoComplete: 'off',
//       title: 'Категория продукта',
//       htmlFor: 'categoryId',
//       onChange: (value: string) =>
//         setEditedCategory({
//           ...editedCategory,
//           categoryName: value,
//         }),
//       options: uniqueCategories.map((cat) => ({
//         value: cat,
//         label: cat,
//       })),
//       required: true,
//     },

//     {
//       id: 'subcategoryName',
//       type: 'text',
//       value: editedSubcategory.subcategoryName || '',
//       placeholder: '',
//       autoComplete: 'off',
//       title: 'Подкатегоря продукта',
//       htmlFor: 'subcategoryId',
//       onChange: (value: string) =>
//         setEditedSubcategory({
//           ...editedSubcategory,
//           subcategoryName: value,
//         }),
//       options: uniqueSubcategories.map((subcat) => ({
//         value: subcat,
//         label: subcat,
//       })),
//     },

//     {
//       id: 'productName',
//       type: 'text',
//       value: editedProduct.productName,
//       autoComplete: 'off',
//       placeholder: '',
//       title: 'Название продукта',
//       htmlFor: 'productName',
//       onChange: (value: string) =>
//         setEditedProduct({
//           ...editedProduct,
//           productName: value,
//         }),
//     },
//     {
//       id: 'promoStartDate',
//       type: 'text',
//       value: editedProduct.promoStartDate,
//       autoComplete: 'off',
//       placeholder: '',
//       title: 'Дата начала акции',
//       htmlFor: 'promoStartDate',
//       onChange: (value: string) =>
//         setEditedProduct({
//           ...editedProduct,
//           promoStartDate: value,
//         }),
//     },
//     {
//       id: 'promoEndDate',
//       type: 'text',
//       value: editedProduct.promoEndDate,
//       autoComplete: 'off',
//       placeholder: '',
//       title: 'Дата окончания акции',
//       htmlFor: 'promoEndDate',
//       onChange: (value: string) =>
//         setEditedProduct({
//           ...editedProduct,
//           promoEndDate: value,
//         }),
//     },
//     {
//       id: 'originalPrice',
//       type: 'number',
//       value: editedProduct.originalPrice.toString(),
//       autoComplete: 'off',
//       placeholder: '',
//       title: 'Начальная цена',
//       htmlFor: 'originalPrice',
//       onChange: (value: string) =>
//         setEditedProduct({
//           ...editedProduct,
//           originalPrice: parseFloat(value),
//         }),
//     },
//     {
//       id: 'customerPrice',
//       type: 'number',
//       value: editedProduct.customerPrice.toString(),
//       autoComplete: 'off',
//       placeholder: '',
//       title: 'Цена для покупателя',
//       htmlFor: 'customerPrice',
//       onChange: (value: string) =>
//         setEditedProduct({
//           ...editedProduct,
//           customerPrice: parseFloat(value),
//         }),
//     },
//     {
//       id: 'employeePrice',
//       type: 'number',
//       value: editedProduct.employeePrice.toString(),
//       autoComplete: 'off',
//       placeholder: '',
//       title: 'Цена для сотрудника',
//       htmlFor: 'employeePrice',
//       onChange: (value: string) =>
//         setEditedProduct({
//           ...editedProduct,
//           employeePrice: parseFloat(value),
//         }),
//     },
//     {
//       id: 'isNew',
//       type: 'select',
//       value: String(editedProduct.isNew),
//       htmlFor: 'isNew',
//       onChange: (value: boolean) =>
//         setEditedProduct({
//           ...editedProduct,
//           isNew: value === 'true',
//         }),
//       options: [
//         { value: 'true', label: 'Новый' },
//         { value: 'false', label: 'Старый' },
//       ],
//       required: true,
//     },
//     {
//       id: 'isDiscounted',
//       type: 'text',
//       checked: editedProduct.isDiscounted,
//       htmlFor: 'isDiscounted',
//       onChange: (value: boolean) =>
//         setEditedProduct({
//           ...editedProduct,
//           isDiscounted: value,
//         }),
//     },
//     {
//       id: 'description',
//       type: 'text',
//       value: editedProduct.description,
//       autoComplete: 'off',
//       placeholder: '',
//       title: 'Описание продукта',
//       htmlFor: 'description',
//       onChange: (value: string) =>
//         setEditedProduct({
//           ...editedProduct,
//           description: value,
//         }),
//     },
//   ];

//   return (
//     <Wrapper>
//       <form onSubmit={handleFormSubmit}>
//         <Modal
//           modalTitle={modalTitle}
//           isAddingMode={isAddingMode}
//           onDeleteClick={handleDelete}
//           onCancellick={handleCancel}
//           isUpload={isUpload}
//         >
//           {currentStep === 1 && <InputModal inputFields={inputFields} />}

//           {currentStep === 2 && (
//             <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-md dark:bg-neutral-700">
//               <div className="px-4 sm:px-0 text-center">
//                 <h1 className="text-2xl font-bold mb-4">
//                   Форма загрузки фотографии продукта
//                 </h1>
//                 <div className="mt-6">
//                   <div className="mb-4">
//                     <span className="text-center block mb-1 s text-md font-medium leading-6 text-gray-900 mt-2">
//                       Загрузите фотографию продукта
//                     </span>
//                     <input
//                       type="file"
//                       id="fileInput"
//                       name="productPhoto"
//                       className="hidden"
//                       onChange={handleFileInputChange}
//                     />
//                     <label
//                       htmlFor="fileInput"
//                       className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                     >
//                       Выберите файл
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </form>
//     </Wrapper>
//   );
// };

// export default ProductsModal;
