import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import { ICategory, IProduct, ISubcategory } from './Products';
import { VITE_URL } from '../../../VITE_URL';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import deleteProductPhoto from '../../../Redux/thunks/Products/deleteProductPhoto.api';
import PopUpNotification from '../../../ui/PopUpNotification';
import { unwrapResult } from '@reduxjs/toolkit';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import {
  ArrowUturnLeftIcon,
  CloudArrowUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';

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
  invisible: boolean;
}

interface ProductsModalProps {
  isOpen: boolean;
  product: Product | null;
  onSaveAdd: (editedProduct: IProduct) => void;
  onSaveEdit: (editedProduct: IProduct) => void;
  onCloseAddModal: () => void;
  onCloseEditModal: () => void;
  openEditModal: (product: IProduct) => void;
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
  openEditModal,
}) => {
  const subcategory = useAppSelector((state) => state.subcategorySlice.data);
  const category = useAppSelector((state) => state.categorySlice.data);
  const products = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );

  const selectedSubcategory = editedProduct?.subcategoryId
    ? subcategory.find(
        (subcategory: ISubcategory) =>
          subcategory.id === editedProduct.subcategoryId
      )
    : null;

  const selectedCategory = selectedSubcategory
    ? category.find(
        (category: ICategory) => category.id === selectedSubcategory.categoryId
      )
    : null;

  const dispatch = useAppDispatch();
  const id = useAppSelector<number>((state) => state.productSlice.postId);
  const [isUpload, setUpload] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );
  const [showNotificationPicture, setShowNotificationPicture] =
    useState<boolean>(false);
  //* удаление
  const [showNotificationDelProd, setShowNotificationDelProd] =
    useState<boolean>(false);
  const [showNotificationDelPick, setShowNotificationDelPick] =
    useState<boolean>(false);
  const [showErrorNotificationPicture, setErrorShowNotificationPicture] =
    useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product, isAddingMode, setEditedProduct]);

  useEffect(() => {
    if (
      showNotificationPicture ||
      showNotificationDelProd ||
      showNotificationDelPick ||
      showErrorNotificationPicture
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationPicture(false);
        setShowNotificationDelProd(false);
        setShowNotificationDelPick(false);
        setErrorShowNotificationPicture(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationPicture,
    showNotificationDelProd,
    showNotificationDelPick,
    showErrorNotificationPicture,
  ]);

  const modalTitle = isAddingMode ? 'Новый продукт' : 'Редактирование продукта';

  const handleCancel = (): void => {
    setEditedProduct(undefined);
    onCloseEditModal();
    onCloseAddModal();
  };

  const uploadFile = async (
    file: File,
    id: number | 0,
    isAddingMode: boolean
    // { rejectWithValue }: any
  ): Promise<void> => {
    if (file && id) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // setShowNotificationPicture(true);

        const response = await axios.put(
          `${VITE_URL}/admin/productsPhoto/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unwrapResult(response);
        setShowNotificationPicture(true);

        if (isAddingMode) {
          onCloseAddModal();
        } else {
          setTimeout(() => {
            onCloseEditModal();
          }, 50);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Server response data:', error.response.data.error);
          const errorRes = error.response.data.error;
          setErrorNotification(errorRes);
          setErrorShowNotificationPicture(true);
        } else {
          throw error;
        }
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result = await onSaveAdd(editedProduct as IProduct);
      } else {
        if (isConfirmed) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result2 = await onSaveEdit(editedProduct as IProduct);
          // console.log(
          //   'Я заканчиваю первый шаг  ProductModal, отправляю данные на бек'
          // );
        }
      }

      if (typeof result2 !== 'string') {
        // console.log('я иду на второй шаг ProductModal');

        setCurrentStep(2);
        setUpload(true);
      }
      if (typeof result !== 'string') {
        setCurrentStep(2);
        setUpload(true);
      }
    } else if (currentStep === 2) {
      console.log('я иду на втором шаге ProductModal');
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
      // console.log('я принимаю ID', id);

      await uploadFile(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        file,
        id,
        isAddingMode
      );
      // console.log('я закончил второй шаг');
    }
  };

  const handleFileInputChangeModal = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0] || null;

    uploadFile(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      file,
      id,
      isAddingMode
    );
  };

  //! прокинуть ошибки при удалении
  //! нужны стейты здесь
  const handleDelete = (): void => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить продукт?'
    );

    if (isConfirmed && editedProduct && editedProduct.id) {
      const productId = editedProduct.id;
      try {
        dispatch(deleteProduct(productId));
        setShowNotificationDelProd(true);
        //* позволяет вывести уведолмление после закрытия модального окна
        setTimeout(() => {
          onCloseEditModal();
        }, 50);
      } catch (error) {
        console.error('Произошла ошибка при удалении:', error);
      }
    }
  };

  const handleDeletePhoto = (): void => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить изображение?'
    );

    if (isConfirmed && editedProduct && editedProduct.id) {
      const productId = editedProduct.id;

      try {
        dispatch(deleteProductPhoto(productId));
        setShowNotificationDelPick(true);
        setTimeout(() => {
          onCloseEditModal();
        }, 50);
      } catch (error) {
        console.error('Произошла ошибка при удалении:', error);
      }
    }
  };

  const handleBack = (): void => {
    const product: IProduct | undefined = products.find((p) => p.id === id);
    if (product) {
      setEditedProduct(undefined);
      onCloseEditModal();
      openEditModal(product);
    }
  };

  if (!isOpen || !editedProduct) {
    return null;
  }

  const uniqueCategories: string[] = Array.from(
    new Set(category.map((cat: ICategory) => cat.categoryName))
  );

  const uniqueSubcategories: string[] = Array.from(
    new Set(
      subcategory
        .filter(
          (subcat: ISubcategory) => subcat.categoryId === selectedCategory?.id
        )
        .map((subcatName: ISubcategory) => subcatName.subcategoryName)
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
      onChange: (value: string | boolean | number | Date) => {
        const selectedCategory = category.find(
          (cat: ICategory) => cat.categoryName === value
        );

        if (selectedCategory) {
          const filteredSubcategories = subcategory.filter(
            (subcat: ISubcategory) => subcat.categoryId === selectedCategory.id
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
      onChange: (value: string | boolean | number | Date) => {
        const selectedSubcategory = subcategory.find(
          (subcat: ISubcategory) => subcat.subcategoryName === value
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
      title: 'Код номенклатуры',
      htmlFor: 'article',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedProduct({
            ...editedProduct,
            article: value,
          });
        }
      },
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
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedProduct({
            ...editedProduct,
            productName: value,
          });
        }
      },
      required: true,
    },

    {
      id: 'originalPrice',
      name: 'originalPrice',
      type: 'text',
      value: editedProduct.originalPrice.toString().replace(',', '.'),
      autoComplete: 'off',
      placeholder: '',
      title: 'Оригинальная стоимость',
      htmlFor: 'originalPrice',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          let processedValue = value.replace(/\s/g, ''); // Удаление пробелов
          processedValue = processedValue.replace(',', '.'); // Замена запятой на точку
          const sanitizedValue = processedValue.replace(
            /[^0-9.]/g,
            '' // Удаление всех символов, кроме цифр и одной точки
          );

          const parts = sanitizedValue.split('.'); // Разбиваем на целую и дробную части

          if (parts.length <= 2) {
            // Проверяем, что точка встречается не более одного раза
            const integerPart = parts[0];
            const decimalPart = parts[1] || '';

            if (integerPart === '' || /^[1-9]\d*$/.test(integerPart)) {
              if (decimalPart === '' || /^\d{0,2}$/.test(decimalPart)) {
                setEditedProduct({
                  ...editedProduct,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  originalPrice: sanitizedValue,
                });
              }
            }
          }
        }
      },
      required: true,
    },
    {
      id: 'employeePrice',
      name: 'employeePrice',
      type: 'text',
      value: editedProduct.employeePrice.toString().replace(',', '.'),
      autoComplete: 'off',
      placeholder: '',
      title: 'Цена для сотрудника',
      htmlFor: 'employeePrice',

      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          let processedValue = value.replace(/\s/g, ''); // Удаление пробелов
          processedValue = processedValue.replace(',', '.'); // Замена запятой на точку
          const sanitizedValue = processedValue.replace(
            /[^0-9.]/g,
            '' // Удаление всех символов, кроме цифр и одной точки
          );

          const parts = sanitizedValue.split('.'); // Разбиваем на целую и дробную части

          if (parts.length <= 2) {
            // Проверяем, что точка встречается не более одного раза
            const integerPart = parts[0];
            const decimalPart = parts[1] || '';

            if (integerPart === '' || /^[1-9]\d*$/.test(integerPart)) {
              if (decimalPart === '' || /^\d{0,2}$/.test(decimalPart)) {
                setEditedProduct({
                  ...editedProduct,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  employeePrice: sanitizedValue,
                });
              }
            }
          }
        }
      },
      required: true,
    },
    {
      id: 'percentageEmployee',
      name: 'percentageEmployee',
      type: 'text',
      value: (() => {
        if (
          !editedProduct.originalPrice ||
          editedProduct.originalPrice.toString() === '0'
        ) {
          return '0';
        } else {
          return +(
            ((editedProduct.originalPrice - editedProduct.employeePrice) /
              editedProduct.originalPrice) *
            100
          )
            .toFixed(2)
            .toString();
        }
      })(),
      autoComplete: 'off',
      placeholder: '',
      title: 'Процент скидки для сотрудника',
      htmlFor: 'percentageEmployee',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          const newValue = value.replace(/\s/g, '');

          if (!isNaN(+newValue)) {
            const discountedPrice =
              (editedProduct.originalPrice * (100 - +newValue)) / 100;

            setEditedProduct({
              ...editedProduct,
              employeePrice: discountedPrice,
            });
          }
        }
      },
      required: true,
    },
  ];

  return (
    <Wrapper>
      {showNotificationPicture && (
        <PopUpNotification
          titleText={'Обложка продукта загружена'}
          name={editedProduct.productName}
        />
      )}
      {showNotificationDelProd && (
        <PopUpNotification
          titleText={'Продукт удалён'}
          name={editedProduct.productName}
        />
      )}

      {showNotificationDelPick && (
        <PopUpNotification
          titleText={'Изображение продукта удалёно'}
          name={editedProduct.productName}
        />
      )}

      {/* //!уведомления об ошибках */}
      {showErrorNotificationPicture && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <Modal
          modalTitle={modalTitle}
          isAddingMode={isAddingMode}
          onDeleteClick={handleDelete}
          onCancelСlick={handleCancel}
          isUpload={isUpload}
        >
          {currentStep === 1 && (
            <InputModal
              containerClassName={
                'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'
              }
              inputFields={inputFields}
            />
          )}

          {currentStep === 1 && (
            <div className="flex space-x-2 items-center justify-between pb-4">
              <div className="flex space-x-2">
                <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                  Новый
                </h1>
                <input
                  id="isNew"
                  name="isNew"
                  checked={editedProduct.isNew}
                  type="checkbox"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      isNew: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-rose-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-rose-500"
                />
              </div>
              <div className="flex space-x-2">
                <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                  Действует акция (скидка)
                </h1>
                <input
                  id="isDiscounted"
                  name="isDiscounted"
                  checked={editedProduct.isDiscounted}
                  type="checkbox"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      isDiscounted: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-lime-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-lime-500"
                />
              </div>
              <div className="flex space-x-2">
                <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                  Скрыть для покупателей
                </h1>
                <input
                  id="invisible"
                  name="invisible"
                  checked={editedProduct.invisible}
                  type="checkbox"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      invisible: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-slate-400 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-slate-500"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && editedProduct.isDiscounted && (
            <>
              <div className="text-center">
                <span className="text-xs text-orange-500 font-normal">
                  Если скидка не имеет конкретного срока действия, оставьте
                  пустыми поля "Начало" и "Окончание".
                </span>
                <br />
                <span className="text-xs text-green-500 font-normal">
                  Цена для клиента возвращается к оригинальной стоимости после
                  завершения акции.
                </span>
              </div>
              <div className="pt-4 pb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
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
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                  >
                    Окончание акции
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="customerPrice"
                    name="customerPrice"
                    type="text"
                    value={editedProduct.customerPrice
                      .toString()
                      .replace(',', '.')}
                    autoComplete="off"
                    placeholder=""
                    title="Цена со скидкой для клиента"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (typeof value === 'string') {
                        let processedValue = value.replace(/\s/g, ''); // Удаление пробелов
                        processedValue = processedValue.replace(',', '.'); // Замена запятой на точку
                        const sanitizedValue = processedValue.replace(
                          /[^0-9.]/g,
                          '' // Удаление всех символов, кроме цифр и одной точки
                        );

                        const parts = sanitizedValue.split('.'); // Разбиваем на целую и дробную части

                        if (parts.length <= 2) {
                          // Проверяем, что точка встречается не более одного раза
                          const integerPart = parts[0];
                          const decimalPart = parts[1] || '';

                          if (
                            integerPart === '' ||
                            /^[1-9]\d*$/.test(integerPart)
                          ) {
                            if (
                              decimalPart === '' ||
                              /^\d{0,2}$/.test(decimalPart)
                            ) {
                              setEditedProduct({
                                ...editedProduct,
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                customerPrice: sanitizedValue,
                              });
                            }
                          }
                        }
                      }
                    }}
                    required={true}
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                  />
                  <label
                    htmlFor="customerPrice"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                  >
                    Цена со скидкой для клиента
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="percentageCustomer"
                    name="percentageCustomer"
                    type="text"
                    value={(() => {
                      if (
                        !editedProduct.originalPrice ||
                        editedProduct.originalPrice.toString() === '0'
                      ) {
                        return '0';
                      } else {
                        return +(
                          ((editedProduct.originalPrice -
                            editedProduct.customerPrice) /
                            editedProduct.originalPrice) *
                          100
                        )
                          .toFixed(2)
                          .toString();
                      }
                    })()}
                    autoComplete="off"
                    placeholder=""
                    title="Процент скидки для клиента"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (typeof value === 'string') {
                        const newValue = value.replace(/\s/g, '');

                        if (!isNaN(+newValue)) {
                          const discountedPrice =
                            (editedProduct.originalPrice * (100 - +newValue)) /
                            100;

                          setEditedProduct({
                            ...editedProduct,
                            customerPrice: discountedPrice,
                          });
                        }
                      }
                    }}
                    required={true}
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                  />
                  <label
                    htmlFor="percentageCustomer"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                  >
                    Процент скидки для клиента
                  </label>
                </div>
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div className="text-center">
                <label
                  htmlFor="description"
                  className="text-slate-600 text-md font-normal"
                >
                  Описание продукта
                </label>
                <div className="mb-2"></div>

                <ReactQuill
                  id="description"
                  theme="snow"
                  value={editedProduct.description}
                  onChange={(value) =>
                    setEditedProduct({ ...editedProduct, description: value })
                  }
                  className="w-full h-[15vh]"
                />
              </div>
              <div className="mt-14"></div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="flex items-center justify-center mt-2">
                <label
                  htmlFor="dropzone-file-productModal"
                  className="flex flex-col items-center justify-center w-full h-22 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  {' '}
                  {/* <div className="text-center my-2">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Если фотографию продукта менять не нужно, вы можете
                      пропустить этот шаг
                    </p>{' '}
                  </div> */}
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudArrowUpIcon className="cursor-pointer w-8 h-8 text-slate-500" />
                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">Нажмите,</span> чтобы
                      загрузить файл
                    </p>
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                      Загрузите изображение в формате PNG, WEBP <br />
                      Разрешение:{' '}
                      <span className="font-medium">
                        {' '}
                        800x800px (желательно 400x400px)
                      </span>
                    </p>
                  </div>
                  <input
                    id="dropzone-file-productModal"
                    type="file"
                    className="hidden"
                    onChange={handleFileInputChangeModal}
                  />
                  <div className="text-center my-2">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Если фотографию продукта менять не нужно, вы можете
                      пропустить этот шаг
                    </p>{' '}
                  </div>
                </label>
              </div>

              <div className="flex justify-between mt-2">
                <div>
                  <Button
                    type="button"
                    onClick={handleBack}
                    styleCSSButton={
                      'w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-slate-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-slate-800 dark:bg-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:border-slate-700'
                    }
                    styleCSSSpan={'text-sm text-slate-500 dark:text-slate-400'}
                    icon={
                      <ArrowUturnLeftIcon className="w-4 h-4 text-slate-500" />
                    }
                    title="Назад"
                  />
                </div>

                <div>
                  {!isAddingMode &&
                    editedProduct.photo !== '/uploads/noPhoto/null.png' && (
                      <Button
                        type="button"
                        onClick={handleDeletePhoto}
                        styleCSSButton={
                          'w-full flex items-center justify-center w-1/2 px-5 py-2 mr-2 text-sm transition-colors duration-200 p-0.5 group bg-gradient-to-br from-red-500 to-rose-400 hover:bg-gradient-to-bl from-red-500 to-rose-400 rounded-lg gap-x-2 sm:w-auto'
                        }
                        icon={<TrashIcon className="w-4 h-4 text-slate-50" />}
                        title="Удалить изображение"
                      />
                    )}
                </div>
              </div>
            </>
          )}
        </Modal>
      </form>
    </Wrapper>
  );
};

export default ProductsModal;
