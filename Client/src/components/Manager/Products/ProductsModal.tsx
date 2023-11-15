import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import addProduct from '../../../Redux/thunks/Products/addProduct.api';
import deleteProduct from '../../../Redux/thunks/Products/deleteProduct.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';

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
    console.log('ProductsModal props:', isOpen, product, isAddingMode, editedProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
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
        await dispatch(
          addProduct({
            newProduct: editedProduct,
          })
        );
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
      placeholder: 'Введите дату начала акции',
      title: 'Дата начала акции',
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
      placeholder: 'Введите дату окончания акции',
      title: 'Дата окончания акции',
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
      placeholder: 'Введите начальную цену',
      title: 'Начальная цена',
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
      placeholder: 'Введите цену для покупателя',
      title: 'Цена для покупателя',
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
      placeholder: 'Введите цену для сотрудника',
      title: 'Цена для сотрудника',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          employeePrice: parseFloat(value),
        }),
    },
    {
      id: 'isNew',
      type: 'checkbox',
      checked: editedProduct.isNew,
      title: 'Новый продукт',
      onChange: (value: boolean) =>
        setEditedProduct({
          ...editedProduct,
          isNew: value,
        }),
    },
    {
      id: 'isDiscounted',
      type: 'checkbox',
      checked: editedProduct.isDiscounted,
      title: 'Продукт со скидкой',
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
      placeholder: 'Введите описание продукта',
      title: 'Описание продукта',
      onChange: (value: string) =>
        setEditedProduct({
          ...editedProduct,
          description: value,
        }),
    },
    {
      id: 'photo',
      type: 'file',
      title: 'Фотография продукта',
      htmlFor: 'photo',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();

          reader.onloadend = () => {
            setEditedProduct({
              ...editedProduct,
              photo: reader.result as string,
            });
          };

          reader.readAsDataURL(file);
        }
      },
    },
    {
      id: 'categoryId',
      type: 'number',
      value: editedProduct.categoryId.toString(),
      placeholder: 'Введите ID категории продукта',
      title: 'ID категории продукта',
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
      </Modal>
    </Wrapper>
  );
};

export default ProductsModal;
