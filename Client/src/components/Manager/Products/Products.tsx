import React, { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Search from '../../../ui/Search';
import Pagination from '../../../ui/Paggination';
import getProducts from '../../../Redux/thunks/Products/getProducts.api';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { VITE_URL } from '../../../VITE_URL';
import editProduct from '../../../Redux/thunks/Products/editProduct.api';

export interface IProduct {
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

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState<
    IProduct | null | undefined
  >(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filterProducts = () => {
    let filtered = products;

    if (searchText !== '') {
      filtered = filtered.filter((product) => {
        const productFields = [
          String(product.productName),
          String(product.promoStartDate),
          String(product.promoEndDate),
          // String(product.originalPrice),
          // String(product.customerPrice),
          // String(product.employeePrice),
          // String(product.isNew),
          // String(product.isDiscounted),
          String(product.description),
          // String(product.categoryId),
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        return searchTerms.every((term) =>
          productFields.some((field) => field.toLowerCase().includes(term))
        );
      });
    }

    return filtered;
  };

  const displayedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const openEditModal = (product: IProduct) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setAddingMode(false);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setAddingMode(true);
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
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditedProduct(null);
    setModalOpen(false);
  };

  const handleSave = async (editedProduct: IProduct) => {
    try {
      if (selectedProduct) {
        await dispatch(
          editProduct({
            productId: selectedProduct.id,
            newInfo: editedProduct,
          })
        );
        closeEditModal();
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
    }
  };
  return (
    <Wrapper>
      <div>Products</div>

      {/* <Search onFilter={setSearchText} /> */}

      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />  */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`${import.meta.env.VITE_URL}${product.photo}`}
              alt={product.productName}
              className="mb-4 w-full h-32 object-cover rounded"
            />
            <h3 className="text-lg font-bold">{product.productName}</h3>
            <p className="text-gray-600 mb-2">
              Описание: {product.description}
            </p>
            <p className="text-gray-600 mb-2">
              Акция: с {product.promoStartDate} по {product.promoEndDate}
            </p>
            <p className="text-gray-600 mb-2">Цена: {product.originalPrice}</p>
            <p className="text-gray-600 mb-2">
              Цена для сотрудника: {product.employeePrice}
            </p>
            <p className="text-gray-600 mb-2">
              Цена для покупателя: {product.customerPrice}
            </p>
            <button
              onClick={() => openEditModal(product)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Редактировать
            </button>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Products;
