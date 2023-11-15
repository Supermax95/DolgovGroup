import React, { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Search from '../../../ui/Search';
import Pagination from '../../../ui/Paggination';
import getProducts from '../../../Redux/thunks/Products/getProducts.api';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { VITE_URL } from '../../../VITE_URL';
import editProduct from '../../../Redux/thunks/Products/editProduct.api';
import ProductsModal from './ProductsModal';

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
          String(product.description),
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
    console.log('Opening Edit Modal:', product);
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
      photo:'',
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

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
        {displayedProducts.map((product) => (
          <article
            key={product.id}
            className="relative flex flex-col overflow-hidden rounded-lg border"
          >
            <div className="aspect-square overflow-hidden">
              <img
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                src={`${import.meta.env.VITE_URL}${product.photo}`}
                alt={product.productName}
              />
            </div>
            {product.isDiscounted && (
              <div className="absolute top-0 m-2 rounded-full bg-white">
                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  Скидка
                </p>
              </div>
            )}
            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
              <div className="mb-2 flex">
                <p className="mr-3 text-sm font-semibold">
                  ₽{product.customerPrice}
                </p>
                {product.isDiscounted && (
                  <del className="text-xs text-gray-400">
                    {' '}
                    ₽{product.originalPrice}{' '}
                  </del>
                )}
              </div>
              <h3 className="mb-2 text-sm text-gray-400">
                {product.productName}
              </h3>
            </div>
            <button
              className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
              onClick={() => openEditModal(product)}
            >
              <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
                Редактировать
              </div>
            </button>
          </article>
        ))}
        {isModalOpen && (selectedProduct || isAddingMode) && (
          <ProductsModal
            isOpen={isModalOpen}
            product={selectedProduct}
            onSave={handleSave}
            onClose={closeEditModal}
            isAddingMode={isAddingMode}
            editedProduct={editedProduct}
            setEditedProduct={setEditedProduct}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Products;
