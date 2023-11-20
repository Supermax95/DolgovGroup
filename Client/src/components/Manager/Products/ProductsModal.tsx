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
  categoryId: number;
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
  setEditedProduct: React.Dispatch<React.SetStateAction<Product | null | undefined>>;
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
  const id = useAppSelector((state) => state.productSlice.postId);
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  product || {
    id: 0,
    productName: '',
    promoStartDate: '',
    promoEndDate: '',
    originalPrice: 0,
    customerPrice: 0,
    employeePrice: 0,
    isNew: false,
    isDiscounted: false,
    description: '',
    // photo: '',
    categoryId: 0,
  };  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product, isAddingMode, setEditedProduct]);

  const modalTitle = isAddingMode ? 'Новый продукт' : 'Редактирование';

  const handleCancel = () => {
    setEditedProduct(undefined);
    onCloseEditModal();
  };

  const uploadFile = async (file: File | null, id: number | undefined, isAddingMode: boolean): Promise<void> => {
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
        console.error(`Ошибка при загрузке файла:`, error);
      }
    }
  };


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (isAddingMode) {
        onSaveAdd(editedProduct);
      } else {
        onSaveEdit(editedProduct);
      }

      setCurrentStep(2);
    } else if (currentStep === 2) {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      const file = fileInput?.files?.[0];

      await uploadFile(file, id, isAddingMode);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    const id = useAppSelector((state) => state.productSlice.postId);

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

  const inputFields: InputField[] = [
    {
      id: 'categoryId',
      type: 'number',
      value: editedProduct.categoryId.toString(),
      placeholder: '',
      autoComplete: 'off',
      title: 'ID категории продукта',
      htmlFor: 'categoryId',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          categoryId: parseInt(value, 10),
        }),
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
  ];

  return (
    <Wrapper>
      <form onSubmit={handleFormSubmit}>
        <Modal
          modalTitle={modalTitle}
          isAddingMode={isAddingMode}
          onDeleteClick={handleDelete}
          onCancellick={handleCancel}
        >
          <InputModal inputFields={inputFields} />
          {currentStep === 2 && (
            <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-md dark:bg-neutral-700">
              <div className="px-4 sm:px-0 text-center">
                <h1 className="text-2xl font-bold mb-4">Форма загрузки фотографии продукта</h1>
                <div className="mt-6">
                  <div className="mb-4">
                    <span className="text-center block mb-1 s text-md font-medium leading-6 text-gray-900 mt-2">
                      Загрузите фотографию продукта
                    </span>
                    <input
                      type="file"
                      id="fileInput"
                      name="productPhoto"
                      className="mb-2 border rounded-md mr-2"
                      onChange={handleFileInputChange}
                    />
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





// import React, { FC, useEffect, useState } from 'react';
// import { useAppDispatch } from '../../../Redux/hooks';
// import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
// import Wrapper from '../../../ui/Wrapper';
// import InputModal, { InputField } from '../../../ui/InputModal';
// import Modal from '../../../ui/Modal';
// import UploadFile from './UploadsComponent';
// import { IProduct } from './Products';


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
//     photo: string;
//   categoryId: number;
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
//   const dispatch = useAppDispatch();


  

//   product || {
//     id: 0,
//     productName: '',
//     promoStartDate: '',
//     promoEndDate: '',
//     originalPrice: 0,
//     customerPrice: 0,
//     employeePrice: 0,
//     isNew: false,
//     isDiscounted: false,
//     description: '',
//     // photo: '',
//     categoryId: 0,
//   };
//   useEffect(() => {
//     if (product) {
//       setEditedProduct({ ...product });
//     }
//   }, [product, isAddingMode, setEditedProduct]);

//   const modalTitle = isAddingMode ? 'Новый продукт' : 'Редактирование';

//   const handleCancel = () => {
//     setEditedProduct(undefined);
//     onCloseEditModal();
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('editedProduct', editedProduct);
    
//     if (isAddingMode) {
//       onSaveAdd(editedProduct);
//       onCloseAddModal();
//     } else {
//       onSaveEdit(editedProduct);
//       onCloseEditModal();
//     }
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

//   const inputFields: InputField[] = [

   
//   return (
//     <Wrapper>
//       <form onSubmit={handleFormSubmit}>
//         <Modal
//           modalTitle={modalTitle}
//           isAddingMode={isAddingMode}
//           onDeleteClick={handleDelete}
//           onCancellick={handleCancel}
//         >
//           <InputModal inputFields={inputFields} />
//           <UploadFile />
//         </Modal>
//       </form>
//     </Wrapper>
//   );
// };

// export default ProductsModal;


// {
//   id: 'categoryId',
//   type: 'number',
//   value: editedProduct.categoryId.toString(),
//   placeholder: 'Введите ID категории продукта',
//   autoComplete: 'off',
//   title: 'ID категории продукта',
//   htmlFor: 'categoryId',
//   onChange: (value: string) =>
//     setEditedProduct({
//       ...editedProduct,
//       categoryId: parseInt(value, 10),
//     }),
// },
// {
// id: 'productName',
// type: 'text',
// value: editedProduct.productName,
// autoComplete: 'off',
// placeholder: 'Введите название продукта',
// title: 'Название продукта',
// htmlFor: 'productName',
// onChange: (value: string) =>
//   setEditedProduct({
//     ...editedProduct,
//     productName: value,
//   }),
// },
// {
// id: 'promoStartDate',
// type: 'text',
// value: editedProduct.promoStartDate,
// autoComplete: 'off',
// placeholder: 'Введите дату начала акции',
// title: 'Дата начала акции',
// htmlFor: 'promoStartDate',
// onChange: (value: string) =>
//   setEditedProduct({
//     ...editedProduct,
//     promoStartDate: value,
//   }),
// },
// {
// id: 'promoEndDate',
// type: 'text',
// value: editedProduct.promoEndDate,
// autoComplete: 'off',
// placeholder: 'Введите дату окончания акции',
// title: 'Дата окончания акции',
// htmlFor: 'promoEndDate',
// onChange: (value: string) =>
//   setEditedProduct({
//     ...editedProduct,
//     promoEndDate: value,
//   }),
// },
// {
// id: 'originalPrice',
// type: 'number',
// value: editedProduct.originalPrice.toString(),
// autoComplete: 'off',
// placeholder: 'Введите начальную цену',
// title: 'Начальная цена',
// htmlFor: 'originalPrice',
// onChange: (value: string) =>
//   setEditedProduct({
//     ...editedProduct,
//     originalPrice: parseFloat(value),
//   }),
// },
// ];


// {
//     id: 'productName',
//     type: 'text',
//     value: editedProduct.productName,
//     autoComplete: 'off',
//     placeholder: 'Введите название продукта',
//     title: 'Название продукта',
//     htmlFor: 'productName',
//     onChange: (value: string) =>
//       setEditedProduct({
//         ...editedProduct,
//         productName: value,
//       }),
//   },
//   {
//     id: 'promoStartDate',
//     type: 'text',
//     value: editedProduct.promoStartDate,
//     autoComplete: 'off',
//     placeholder: 'Введите дату начала акции',
//     title: 'Дата начала акции',
//     htmlFor: 'promoStartDate',
//     onChange: (value: string) =>
//       setEditedProduct({
//         ...editedProduct,
//         promoStartDate: value,
//       }),
//   },
//   {
//     id: 'promoEndDate',
//     type: 'text',
//     value: editedProduct.promoEndDate,
//     autoComplete: 'off',
//     placeholder: 'Введите дату окончания акции',
//     title: 'Дата окончания акции',
//     htmlFor: 'promoEndDate',
//     onChange: (value: string) =>
//       setEditedProduct({
//         ...editedProduct,
//         promoEndDate: value,
//       }),
//   },
//   {
//     id: 'originalPrice',
//     type: 'number',
//     value: editedProduct.originalPrice.toString(),
//     autoComplete: 'off',
//     placeholder: 'Введите начальную цену',
//     title: 'Начальная цена',
//     htmlFor: 'originalPrice',
//     onChange: (value: string) =>
//       setEditedProduct({
//         ...editedProduct,
//         originalPrice: parseFloat(value),
//       }),
//   },
//   {
//     id: 'customerPrice',
//     type: 'number',
//     value: editedProduct.customerPrice.toString(),
//     autoComplete: 'off',
//     placeholder: 'Введите цену для покупателя',
//     title: 'Цена для покупателя',
//     htmlFor: 'customerPrice',
//     onChange: (value: string) =>
//       setEditedProduct({
//         ...editedProduct,
//         customerPrice: parseFloat(value),
//       }),
//   },
//   {
//     id: 'employeePrice',
//     type: 'number',
//     value: editedProduct.employeePrice.toString(),
//     autoComplete: 'off',
//     placeholder: 'Введите цену для сотрудника',
//     title: 'Цена для сотрудника',
//     htmlFor: 'employeePrice',
//     onChange: (value: string) =>
//       setEditedProduct({
//         ...editedProduct,
//         employeePrice: parseFloat(value),
//       }),
//   },
//   {
//     id: 'isNew',
//     type: 'text',
//     checked: editedProduct.isNew,
//     htmlFor: 'isNew',
//     onChange: (value: boolean) =>
//       setEditedProduct({
//         ...editedProduct,
//         isNew: value,
//       }),
//   },
//   {
//     id: 'isDiscounted',
//     type: 'text',
//     checked: editedProduct.isDiscounted,
//     htmlFor: 'isDiscounted',
//     onChange: (value: boolean) =>
//       setEditedProduct({
//         ...editedProduct,
//         isDiscounted: value,
//       }),
//   },
//   {
//     id: 'description',
//     type: 'text',
//     value: editedProduct.description,
//     autoComplete: 'off',
//     placeholder: 'Введите описание продукта',
//     title: 'Описание продукта',
//     htmlFor: 'description',
//     onChange: (value: string) =>
//       setEditedProduct({
//         ...editedProduct,
//         description: value,
//       }),
//   },
//   // {
//   //   id: 'photo',
//   //   type: 'text',
//   //   title: 'Фотография продукта',
//   //   placeholder: 'Путь',
//   //   autoComplete: 'off',
//   //   htmlFor: 'photo',
//   //   onChange: (value: string) =>
//   //     setEditedProduct({
//   //       ...editedProduct,
//   //       photo: value,
//   //     }),
//   // },