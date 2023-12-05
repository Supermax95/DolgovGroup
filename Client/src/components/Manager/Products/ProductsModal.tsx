import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import { IProduct } from './Products';
import { VITE_URL } from '../../../VITE_URL';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Product {
  id: number;
  article: string;
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
  visible: boolean;
}

// interface Category {
//   id: number | 0;
//   categoryName: string | '';
// }

// interface Subcategory {
//   id: number | null;
//   categoryId: number | 0;
//   subcategoryName: string | '';
// }

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
  axiosError: string | null;
  resetAxiosError: () => void;
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
  axiosError,
  resetAxiosError,
}) => {
  const subcategory = useAppSelector((state) => state.subcategorySlice.data);
  const category = useAppSelector((state) => state.categorySlice.data);
  console.log('category', category);

  const selectedSubcategory = editedProduct?.subcategoryId
    ? subcategory.find(
        (subcategory) => subcategory.id === editedProduct.subcategoryId
      )
    : null;
  console.log('selectedSubcategory', selectedSubcategory);
  const selectedCategory = selectedSubcategory
    ? category.find(
        (category) => category.id === selectedSubcategory.categoryId
      )
    : null;
  console.log('selectedCategory', selectedCategory);

  const id = useAppSelector((state) => state.productSlice.postId);
  const dispatch = useAppDispatch();
  const [isUpload, setUpload] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product, isAddingMode, setEditedProduct]);
  const modalTitle = isAddingMode ? 'Новый продукт' : 'Редактирование продукта';
  const handleCancel = () => {
    setEditedProduct(undefined);
    resetAxiosError();
    onCloseEditModal();
    onCloseAddModal();
  };

  const uploadFile = async (
    file: File,
    id: number | 0,
    isAddingMode: boolean
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
      if (
        !selectedSubcategory ||
        selectedSubcategory.subcategoryName === 'Выберите категорию'
      ) {
        alert('Пожалуйста, выберите категорию продукта');
        return;
      }
      let result = '';
      let result2 = '';

      if (isAddingMode) {
        result = await onSaveAdd(editedProduct as IProduct);
      } else {
        result2 = await onSaveEdit(editedProduct as IProduct);
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
  const uniqueSubcategories = Array.from(
    new Set(
      subcategory
        .filter((subcat) => subcat.categoryId === selectedCategory?.id)
        .map((cat) => cat.subcategoryName)
    )
  );

  const inputFields: InputField[] = [
    {
      id: 'categoryName',
      name: 'categoryName',
      type: 'text',
      value: selectedCategory
        ? selectedCategory.categoryName
        : 'Выберите категорию',
      placeholder: '',
      autoComplete: 'off',
      title: 'Категория продукта',
      htmlFor: 'categoryName',
      onChange: (value: string) => {
        const selectedCategory = category.find(
          (cat) => cat.categoryName === value
        );
        //console.log('selectedCategory============>', selectedCategory);

        if (selectedCategory) {
          const filteredSubcategories = subcategory.filter(
            (subcat) => subcat.categoryId === selectedCategory.id
          );

          const firstSubcategory = filteredSubcategories[0];

          setEditedProduct({
            ...editedProduct,
            subcategoryId: firstSubcategory ? firstSubcategory.id : 1,
          });
        }
      },
      options: [
        ...(selectedCategory
          ? []
          : [
              {
                value: 'Выберите категорию',
                label: 'Выберите категорию',
              },
            ]),
        ...uniqueCategories.map((cat) => ({
          value: cat,
          label: cat,
        })),
      ],
      required: true,
    },
    {
      id: 'subcategoryId',
      name: 'subcategoryId',
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
            subcategoryId: selectedSubcategory?.id ?? 1,
          });
        }
      },
      options: [
        ...(selectedSubcategory
          ? []
          : [
              {
                value: 'Выберите подкатегорию',
                label: 'Выберите подкатегорию',
              },
            ]),
        ...uniqueSubcategories.map((subcat) => ({
          value: subcat,
          label: subcat,
        })),
      ],
      required: true,
    },
    {
      id: 'article',
      name: 'article',
      type: 'text',
      value: editedProduct.article,
      autoComplete: 'off',
      placeholder: '',
      title: 'Артикул',
      htmlFor: 'productName',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          article: value,
        }),
      required: true,
    },
    {
      id: 'productName',
      name: 'productName',
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
      required: true,
    },
    {
      id: 'promoStartDate',
      name: 'promoStartDate',
      type: 'text',
      value: editedProduct.promoStartDate,
      autoComplete: 'off',
      placeholder: '',
      title: 'Начало акции',
      htmlFor: 'promoStartDate',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          promoStartDate: value,
        }),
    },
    {
      id: 'promoEndDate',
      name: 'promoEndDate',
      type: 'text',
      value: editedProduct.promoEndDate,
      autoComplete: 'off',
      placeholder: '',
      title: 'Конец акции',
      htmlFor: 'promoEndDate',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          promoEndDate: value,
        }),
    },
    {
      id: 'originalPrice',
      name: 'originalPrice',
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
      name: 'customerPrice',
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
      name: 'employeePrice',
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
    // {
    //   id: 'description',
    //   type: 'text',
    //   value: editedProduct.description,
    //   autoComplete: 'off',
    //   placeholder: '',
    //   title: 'Описание продукта',
    //   htmlFor: 'description',
    //   onChange: (value: string) =>
    //     setEditedProduct({
    //       ...editedProduct,
    //       description: value,
    //     }),
    // },
    {
      id: 'isDiscounted',
      name: 'isDiscounted',
      type: 'text',
      value: editedProduct.isDiscounted,
      title: 'Товар со скидкой',
      htmlFor: 'isDiscounted',
      onChange: (value: boolean) =>
        setEditedProduct({
          ...editedProduct,
          isDiscounted: value,
        }),
    },
    {
      id: 'isNew',
      name: 'isNew',
      type: 'text',
      value: editedProduct.isNew,
      title: 'Новинка',
      htmlFor: 'isNew',
      onChange: (value: boolean) =>
        setEditedProduct({
          ...editedProduct,
          isNew: value,
        }),
    },
    {
      id: 'visible',
      name: 'visible',
      type: 'text',
      value: editedProduct.visible,
      title: 'Виден покупателям',
      htmlFor: 'visible',
      onChange: (value: boolean) =>
        setEditedProduct({
          ...editedProduct,
          visible: value,
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
          <div className="input-modal-container">
            {axiosError && (
              <div className="text-sm text-rose-400 text-center mt-2">
                {axiosError}
              </div>
            )}
            {currentStep === 1 && (
              <InputModal
                containerClassName={
                  'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'
                }
                inputFields={inputFields}

                // inputFields={inputField}
              />
            )}

            {/* {currentStep === 1 && (
              <div className="w-72 flex items-center justify-between">
                <div className="relative">
                  <input
                    id="promoStartDate"
                    type="date"
                    value={editedProduct.promoStartDate}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        promoStartDate: e.target.value,
                      })
                    }
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                  />
                  <label
                    htmlFor="promoStartDate"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                  >
                    Начало акции
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="promoEndDate"
                    type="date"
                    value={editedProduct.promoEndDate}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        promoEndDate: e.target.value,
                      })
                    }
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                  />
                  <label
                    htmlFor="promoEndDate"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                  >
                    Конец акции
                  </label>
                </div>
              </div>
            )} */}

            {currentStep === 1 && (
              <div className="description-container resize-y overflow-auto min-h-50">
                <label htmlFor="description" className="text-slate-400 text-sm">
                  Описание продукта
                </label>
                <ReactQuill
                  theme="snow"
                  value={editedProduct.description}
                  onChange={(value) =>
                    setEditedProduct({ ...editedProduct, description: value })
                  }
                  // placeholder="Описание продукта"
                  className="w-full" /* Чтобы растягиваться по ширине контейнера */
                />
              </div>
            )}
          </div>

          {currentStep === 2 && (
            <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-md dark:bg-neutral-700">
              <div className="px-4 sm:px-0 text-center">
                <h1 className="text-xl font-bold mb-4">
                  Форма загрузки фотографии продукта
                </h1>
                <span className="block mt-2 text-sm text-gray-500">
                  Если фотографию продукта менять не нужно, вы можете пропустить
                  этот шаг
                </span>
                <div className="mt-6">
                  <div className="mb-4">
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
