import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import addProduct from '../../../Redux/thunks/Products/addProduct.api';
import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import UploadFile from './UploadsComponent';

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
  onSave: (editedProduct: Product) => void;
  onClose: () => void;
  isAddingMode: boolean;
  editedProduct: Product | null | undefined;
  setEditedProduct: React.Dispatch<
    React.SetStateAction<Product | null | undefined>
  >;
}

const ProductsModal: FC<ProductsModalProps> = ({
  isOpen,
  product,
  onSave,
  onClose,
  isAddingMode,
  editedProduct,
  setEditedProduct,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    } else if (isAddingMode) {
      setEditedProduct({
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
        photo: '',
        categoryId: 0,
      });
    }
  }, [product, isAddingMode, setEditedProduct]);

  const modalTitle = isAddingMode ? 'Новый продукт' : 'Редактирование';

  const handleCancel = () => {
    setEditedProduct(undefined);
    onClose();
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
      onClose();
    }
  };

  const handleAdd = async () => {
    if (editedProduct) {
      try {
        await dispatch(addProduct({ newProduct: editedProduct }));
        onClose();
      } catch (error) {
        console.error('Произошла ошибка при добавлении:', error);
      }
    } else {
      alert('Заполните все поля перед добавлением.');
    }
  };

  const handleDelete = () => {
    if (editedProduct && editedProduct.id) {
      const productId = editedProduct.id;
      dispatch(deleteProduct(productId));
      onClose();
    }
  };

  if (!isOpen || !editedProduct) {
    return null;
  }

  const inputFields: InputField[] = [
    {
      id: 'productName',
      type: 'text',
      value: editedProduct.productName,
      autoComplete: 'off',
      placeholder: 'Введите название продукта',
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
      placeholder: 'Введите дату начала акции',
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
      placeholder: 'Введите дату окончания акции',
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
      placeholder: 'Введите начальную цену',
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
      placeholder: 'Введите цену для покупателя',
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
      placeholder: 'Введите цену для сотрудника',
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
      type: 'text',
      checked: editedProduct.isNew,
      htmlFor: 'isNew',
      onChange: (value: boolean) =>
        setEditedProduct({
          ...editedProduct,
          isNew: value,
        }),
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
      placeholder: 'Введите описание продукта',
      title: 'Описание продукта',
      htmlFor: 'description',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          description: value,
        }),
    },
    {
      id: 'photo',
      type: 'text',
      title: 'Фотография продукта',
      placeholder: 'Путь',
      autoComplete: 'off',
      htmlFor: 'photo',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          photo: value,
        }),
    },
    {
      id: 'categoryId',
      type: 'number',
      value: editedProduct.categoryId.toString(),
      placeholder: 'Введите ID категории продукта',
      autoComplete: 'off',
      title: 'ID категории продукта',
      htmlFor: 'categoryId',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          categoryId: parseInt(value, 10),
        }),
    },
  ];

  return (
    <Wrapper>
      <Modal
        modalTitle={modalTitle}
        isAddingMode={isAddingMode}
        onAddClick={handleAdd}
        onSaveClick={handleSave}
        onDeleteClick={handleDelete}
        onCancellick={handleCancel}
      >
        <InputModal inputFields={inputFields} />
        <UploadFile id={editedProduct.id} />
      </Modal>
    </Wrapper>
  );
};

export default ProductsModal;
