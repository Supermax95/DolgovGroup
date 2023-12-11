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
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';

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
  invisible: boolean;
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
          String(product.article),
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        const isPromoEnded =
          product.promoEndDate && isPast(parseISO(product.promoEndDate));

        return (
          searchTerms.every((term) =>
            productFields.some((field) => field.toLowerCase().includes(term))
          ) ||
          (isPromoEnded && searchText.toLowerCase().includes('закончилась'))
        );
      });
    }

    //* для сайдбара
    if (currentCategory) {
      //* выводит массив объектов подкатегорий
      const subcategoriesOfCurrentCategory = subcategories.filter(
        (sub) => sub.categoryId === currentCategory.id
      );

      // console.log(
      //   'subcategoriesOfCurrentCategory',
      //   subcategoriesOfCurrentCategory
      // );

      /** если для хотя бы одного элемента product в массиве filtered условие внутри some возвращает true,
       * то этот product будет включен в результирующий массив filtered. */
      filtered = filtered.filter((product) => {
        //console.log('product', product.subcategoryId);
        return subcategoriesOfCurrentCategory.some(
          (sub) => sub.id === product.subcategoryId
          // console.log(
          //   'sub.id',
          //   sub.subcategoryName,
          //   sub.id,
          //   'PRODUCT',
          //   product.subcategoryId,
          //   product.productName
          // )
        );
      });
      // console.log('категория и все подкатегории', filtered);
    }

    //* Фильтрация по текущей подкатегории
    if (currentSubcategory) {
      //console.log('currentSubcategoryPRODUCT', currentSubcategory);

      filtered = filtered.filter(
        (product) => product.subcategoryId === currentSubcategory.id
      );
      //   console.log('подкатегория', filtered);
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
      invisible: false,
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

  const resetAxiosError = () => {
    setAxiosError(null);
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

  const reverseDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <Wrapper>
      <ProductSidebar
        categories={categories}
        onCategorySelect={setCurrentCategory}
        onSubcategorySelect={setCurrentSubcategory}
      />

      <div className="p-4">
        {/* //!поиск */}
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

        {/** новая карточка */}
        <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
          {displayedProducts.map((product) => (
            <article className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
              <div className="relative">
                <img
                  className="h-56 w-full object-cover"
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

              <div className="flex-auto px-6 py-5">
                <span className="mb-2 flex items-center text-sm font-semibold text-slate-500">
                  {/* //! Было бы хорошо добавить копирование артикула по клику на иконку*/}
                  <ClipboardDocumentCheckIcon className="mr-1 h-5 w-5" />
                  {/* <p className="mb-2 text-slate-600 text-sm font-normal">
                    Артикул:{' '} */}
                  <span className="text-slate-700 font-medium">
                    {product.article || 'нет'}
                  </span>
                  {/* </p> */}
                </span>
                <h3 className="mt-4 mb-3 text-sm text-slate-700 font-semibold xl:text-lg lg:text-lg">
                  {product.productName || 'Нет названия'}
                </h3>

                {product.isDiscounted && (
                  <p className="mb-2 text-slate-600 text-sm font-normal">
                    Оригинальная стоимость:{' '}
                    <del className="text-slate-600 font-medium">
                      {product.originalPrice} ₽
                    </del>
                  </p>
                )}

                {product.isDiscounted ? (
                  <p className="mb-2 text-slate-600 text-sm font-normal">
                    Цена со скидкой для клиента:{' '}
                    <span className="text-rose-600 font-medium">
                      {product.customerPrice} ₽
                    </span>
                  </p>
                ) : (
                  <p className="mb-2 text-slate-600 text-sm font-normal">
                    Оригинальная стоимость:{' '}
                    <span className="text-lime-600 font-medium">
                      {product.originalPrice} ₽
                    </span>
                  </p>
                )}

                {product.employeePrice ? (
                  <p className="mb-2 text-slate-600 text-sm font-normal">
                    Цена для сотрудников:{' '}
                    <span className="text-amber-600 font-medium">
                      {product.employeePrice} ₽
                    </span>
                  </p>
                ) : (
                  <p className="mb-2 text-slate-600 text-sm font-normal">
                    Цена для сотрудников:{' '}
                    <span className="text-amber-600 font-medium">
                      не указана
                    </span>
                  </p>
                )}

                {/* //! надо исправить период акции */}
                {product.promoStartDate && product.promoEndDate ? (
                  <div className="mb-2">
                    {isToday(parseISO(product.promoEndDate)) ? (
                      <span className="text-red-500 text-sm font-medium">
                        Период акции: Акция истекает сегодня
                      </span>
                    ) : isPast(parseISO(product.promoEndDate)) ? (
                      <span className="text-red-500 text-sm font-medium">
                        Акция завершена
                      </span>
                    ) : (
                      `Период акции: с ${reverseDate(
                        product.promoStartDate
                      )} по ${reverseDate(product.promoEndDate)}`
                    )}
                  </div>
                ) : (
                  <div className="mb-2 text-lime-600 text-sm font-medium">
                    Не участвует в акции
                  </div>
                )}

                {/* //! даже если описания нет, инпут остаётся, тернарка не работает, т.к. теги почему-то хранятся в бд */}
                {product.description ? (
                  <div className="mb-2 w-full">
                    <span className="text-slate-600 text-sm font-normal">
                      Описание:
                    </span>
                    <div
                      id="description"
                      className="block p-2.5 h-full w-full text-sm text-slate-700 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto resize-y"
                      style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-2 text-slate-600 text-sm font-medium">
                    Описание отсутствует
                  </div>
                )}
              </div>
              <div className="flex items-end justify-center py-2">
                <Button
                  type="button"
                  title="Редактировать"
                  onClick={() => openEditModal(product)}
                />
              </div>
            </article>
          ))}

          {/* карточки с товаром старые */}
          {displayedProducts.map((product) => (
            <article
              key={product.id}
              className="relative flex flex-col overflow-hidden rounded-lg border bg-white "
            >
              <div className="aspect-square relative overflow-hidden ">
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

              {/* //! h-3/6 h-full влияют на отображение карточки (именно картинки) */}
              <div className="my-4 mx-auto flex h-3/6 w-10/12 flex-col items-start">
                {/* //! выделить имя как-то */}
                <p className="mb-2 text-lg font-medium text-slate-700">
                  {product.productName || 'Нет названия'}
                </p>

                <p className="mb-2 text-slate-600 text-sm font-normal">
                  Артикул:{' '}
                  <span className="text-slate-600 font-medium">
                    {product.article || 'нет'}
                  </span>
                </p>

                <div className="mb-2">
                  {product.isDiscounted && (
                    <p className="mb-2 text-slate-600 text-sm font-normal">
                      Оригинальная стоимость:{' '}
                      <del className="text-slate-600 font-medium">
                        {product.originalPrice} ₽
                      </del>
                    </p>
                  )}

                  {product.isDiscounted ? (
                    <p className="mb-2 text-slate-600 text-sm font-normal">
                      Цена со скидкой для клиента:{' '}
                      <span className="text-rose-600 font-medium">
                        {product.customerPrice} ₽
                      </span>
                    </p>
                  ) : (
                    <p className="mb-2 text-slate-600 text-sm font-normal">
                      Оригинальная стоимость:{' '}
                      <span className="text-lime-600 font-medium">
                        {product.originalPrice} ₽
                      </span>
                    </p>
                  )}

                  {product.employeePrice ? (
                    <p className="mb-2 text-slate-600 text-sm font-normal">
                      Цена для сотрудников:{' '}
                      <span className="text-amber-600 font-medium">
                        {product.employeePrice} ₽
                      </span>
                    </p>
                  ) : (
                    <p className="mb-2 text-slate-600 text-sm font-normal">
                      Цена для сотрудников:{' '}
                      <span className="text-amber-600 font-medium">
                        не указана
                      </span>
                    </p>
                  )}

                  {product.promoStartDate && product.promoEndDate ? (
                    <div className="mb-2 text-slate-600 text-sm font-normal">
                      Период акции:{' '}
                      {isToday(parseISO(product.promoEndDate)) ? (
                        <span className="text-red-500 font-medium">
                          Акция истекает сегодня
                        </span>
                      ) : isPast(parseISO(product.promoEndDate)) ? (
                        <span className="text-red-500 font-medium">
                          Акция завершена
                        </span>
                      ) : (
                        ` с ${reverseDate(
                          product.promoStartDate
                        )} по ${reverseDate(product.promoEndDate)}`
                      )}
                    </div>
                  ) : (
                    <div className="mb-2 text-slate-600 text-sm font-normal">
                      Не участвует в акции
                    </div>
                  )}
                </div>

                <div className="mb-2 text-slate-600 text-sm font-normal w-full">
                  Описание:
                  {product.description ? (
                    <div
                      id="Description"
                      className="block p-2.5 h-full w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto resize-y"
                      style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    ></div>
                  ) : (
                    <span className="text-gray-500">нет</span>
                  )}
                </div>
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

        {/* <div className="mt-4 flex justify-center"> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        {/* </div> */}

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
            resetAxiosError={resetAxiosError}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Products;
