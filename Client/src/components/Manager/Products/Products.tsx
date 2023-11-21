import { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Search from '../../../ui/Search';
import getProducts from '../../../Redux/thunks/Products/getProducts.api';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { VITE_URL } from '../../../VITE_URL';
import editProduct from '../../../Redux/thunks/Products/editProduct.api';
import ProductsModal from './ProductsModal';
import addProduct from '../../../Redux/thunks/Products/addProduct.api';
import Pagination from '../../../ui/Paggination';
import Sidebar from '../../../ui/Sidebar';
import getCategory from '../../../Redux/thunks/Category/getCategory.api';

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

export interface ICategory {
  id: number;
  categoryName: string;
  subcategory: string;
}

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
    );
    const category = useAppSelector<ICategory[]>(
      (state) => state.categorySlice.data
    );    
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const itemsPerPage = 30;
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

  const displayedProducts = filterProducts().slice(startIndex, endIndex);
  const totalPages = Math.ceil(filterProducts().length / itemsPerPage);

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

  const closeAddModal = () => {
    setSelectedProduct(null);
    setEditedProduct(null);
    setModalOpen(false);
    dispatch(getProducts());
  };

  const openEditModal = (product: IProduct) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setAddingMode(false);
    setModalOpen(true);
    dispatch(getProducts());
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditedProduct(null);
    setModalOpen(false);
    dispatch(getProducts());
  };

  const handleSaveAdd = async () => {
    try {
      if (editedProduct) {
        await dispatch(
          addProduct({
            newProduct: editedProduct,
          })
        );
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
    }
  };

  const handleSaveEdit = async (editedProduct: IProduct) => {
    try {
      if (selectedProduct) {
        await dispatch(
          editProduct({
            newInfo: editedProduct,
          })
        );
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
    }
  };

  const uniqueCategory = [
    ...new Set(category.map((category) => category.categoryName)),
  ];

  return (
    <Wrapper>
       <Sidebar
        items={uniqueCategory}
        onItemSelect={setSelectedCategory}
        title="Категории"
        setCurrentPage={setCurrentPage}
        displayKey={(categoryName) => categoryName}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="col-span-full mb-4">
          <div className="flex items-center justify-between">
            <Search onFilter={setSearchText} />
            <button
              className="ml-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={openAddModal}
            >
              Добавить
            </button>
          </div>
        </div>
        {displayedProducts.map((product) => (
          <article
            key={product.id}
            className="relative flex flex-col overflow-hidden rounded-lg border"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                className="h-36 w-full object-cover rounded-t-lg transition-all duration-300 group-hover:scale-125"
                src={`${VITE_URL}${product.photo}`}
                alt={product.productName}
              />

              {(product.isDiscounted || product.isNew) && (
                <div className="absolute top-0 right-0 m-2">
                  {product.isDiscounted && (
                    <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                      Скидка
                    </p>
                  )}
                  {product.isNew && (
                    <p className="rounded-full bg-red-500 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 mt-2">
                      Новый
                    </p>
                  )}
                </div>
              )}
            </div>

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
              <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white rounded-b-lg">
                Редактировать
              </div>
            </button>
          </article>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {isModalOpen && (selectedProduct || isAddingMode) && (
        <ProductsModal
          isOpen={isModalOpen}
          product={selectedProduct}
          onSaveEdit={handleSaveEdit}
          onSaveAdd={handleSaveAdd}
          onCloseAddModal={closeAddModal}
          onCloseEditModal={closeEditModal}
          isAddingMode={isAddingMode}
          editedProduct={editedProduct}
          setEditedProduct={setEditedProduct}
        />
      )}
    </Wrapper>
  );
};

export default Products;
