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
import getCategory from '../../../Redux/thunks/Category/getCategory.api';
import getSubcategory from '../../../Redux/thunks/SubCategory/getSubcategory.api';
import ProductSidebar from './ProductSidebar/ProductSidebar';
import { isToday, parseISO, isPast } from 'date-fns';
import { unwrapResult } from '@reduxjs/toolkit';

export interface IProduct {
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
}

export interface ICategory {
  id: number;
  categoryName: string;
}

export interface ISubcategory {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );

  //* для сайдбара
  const categories = useAppSelector<ICategory[]>(
    (state) => state.categorySlice.data
  );
  const subcategories = useAppSelector<ISubcategory[]>(
    (state) => state.subcategorySlice.data
  );
  //* для сайдбара
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );
  const [currentSubcategory, setCurrentSubcategory] =
    useState<ISubcategory | null>(null);

  // остальное
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState<
    IProduct | null | undefined
  >(null);
  const [axiosError, setAxiosError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubcategory());
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
          // String(product.description),
          String(product.article),
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        return searchTerms.every((term) =>
          productFields.some((field) => field.toLowerCase().includes(term))
        );
      });
    }

    //* для сайдбара
    // // Фильтрация по текущей категории
    // if (currentCategory) {
    //   console.log('currentCategory', currentCategory);

    //   //* Находим все подкатегории, принадлежащие текущей категории
    //   const subcategory = subcategories.filter(
    //     (sub) => sub.categoryId === currentCategory.id
    //   );

    //   console.log('subcategory', subcategory);

    //   //* мне нужно сравнить, что категория совпадает с текущими подкатегориями
    //   //* далее нужно сравнить продукты, и что они совпадают с текущим значением подкатегорий и выводить их по главной категории

    //   //* Фильтруем продукты таким образом, чтобы остались только те, которые принадлежат текущей категории или ее подкатегориям
    //   filtered = filtered.filter((product) => {
    //     console.log('productproduct', product.subcategoryId);

    //     // const productSubcategory = categorySubcategories.find(
    //     //   (sub) => sub.id === product.subcategoryId
    //     // );
    //     // console.log('выводит только одно что-то первое', productSubcategory);
    //     // return (
    //     //   // productSubcategory ||
    //     //   product.subcategoryId === currentCategory.id
    //     // );
    //   });
    //   //console.log('filtered', filtered);
    // }

    if (currentCategory) {
      //* выводит массив объектов подкатегорий
      const subcategoriesOfCurrentCategory = subcategories.filter(
        (sub) => sub.categoryId === currentCategory.id
      );

      console.log(
        'subcategoriesOfCurrentCategory',
        subcategoriesOfCurrentCategory
      );

      //* id продукта должен совпадать с id в таблице subcategory
      //* выводит массив продуктов
      filtered = filtered.filter((product) => {
        return subcategoriesOfCurrentCategory.some(
          (sub) =>
            // console.log('sub.id', sub.id)
            sub.id === product.subcategoryId
        );
      });
      console.log('filteredsome', filtered);
    }

    // Фильтрация по текущей подкатегории
    if (currentSubcategory) {
      filtered = filtered.filter(
        (product) => product.subcategoryId === currentSubcategory.id
      );
      console.log('filtered', filtered);
    }

    return filtered;
  };

  const displayedProducts = filterProducts().slice(startIndex, endIndex);
  const totalPages = Math.ceil(filterProducts().length / itemsPerPage);

  const openAddModal = () => {
    setAddingMode(true);
    setEditedProduct({
      id: 0,
      article: '',
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
      subcategoryId: 0,
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
    let add = {} as any;
    try {
      if (editedProduct) {
        const resultAction = await dispatch(
          addProduct({
            newProduct: editedProduct,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setAxiosError(null);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setAxiosError(error as string | null);
      add = error;
    }
    return add;
  };

  const handleSaveEdit = async (editedProduct: IProduct) => {
    let add = {} as any;
    try {
      if (selectedProduct) {
        const resultAction = await dispatch(
          editProduct({
            newInfo: editedProduct,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setAxiosError(null);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setAxiosError(error as string | null);
      add = error;
    }
    return add;
  };

  const reverseDate = (dateString: string): string=> {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <Wrapper>
      <ProductSidebar
        categories={categories}
        onCategorySelect={setCurrentCategory}
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
            className="relative flex flex-col overflow-hidden rounded-lg border bg-white dark:bg-neutral-700 h-full"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                className="h-full w-full object-cover rounded-t-lg transition-all duration-300 group-hover:scale-125 flex-shrink-0"
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

            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between h-full">
              <div className="mb-2">
                {product.isDiscounted && (
                  <div className="flex text-xs text-gray-400">
                    <span className="mr-3">Начальная цена</span>
                    <del>₽{product.originalPrice}</del>
                  </div>
                )}
                <div className="flex">
                  <p className="mr-3 text-xs font-semibold text-gray-700">
                    {product.isDiscounted
                      ? `Цена для покупателя ₽${product.customerPrice}`
                      : `Цена ₽${product.originalPrice}`}
                  </p>
                </div>
              </div>
              <div>
                {product.employeePrice ? (
                  <div className="mb-2 text-xs text-green-500">
                    Цена для сотрудника: ₽{product.employeePrice}
                  </div>
                ) : (
                  <div className="mb-2 text-xs text-red-500">
                    Цены для сотрудника нет
                  </div>
                )}
              </div>
              <h3 className="mb-2 text-sm text-gray-400">
                {product.productName || 'Нет названия'}
              </h3>

              {product.promoStartDate && product.promoEndDate ? (
                <div className="mb-2 text-xs text-gray-500">
                  Промо:
                  {isToday(parseISO(product.promoEndDate)) ? (
                    <span className="text-red-500">
                      {' '}
                      Акция истекает сегодня
                    </span>
                  ) : isPast(parseISO(product.promoEndDate)) ? (
                    <span className="text-red-500"> Акция закончилась</span>
                  ) : (
                    ` с ${reverseDate(product.promoStartDate)} по ${reverseDate(
                      product.promoEndDate
                    )}`
                  )}
                </div>
              ) : (
                <div className="mb-2 text-xs text-gray-500">Промо нет</div>
              )}
              <div className="mb-2 text-xs text-gray-500">
                Описание:
                {product.description ? (
                  <div
                    id="Description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto"
                    style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}
                  >
                    {product.description}
                  </div>
                ) : (
                  <span className="text-gray-500">нет</span>
                )}
              </div>

              <h3 className="mb-2 text-sm text-black-400">
                {`Артикул: ${product.article || 'нет '}`}
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
          axiosError={axiosError}
        />
      )}
    </Wrapper>
  );
};

export default Products;
