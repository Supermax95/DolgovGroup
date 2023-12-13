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
import {
  CheckIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
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
  const [selectedVisibility, setSelectedVisibility] = useState<
    'all' | 'visible' | 'invisible'
  >('all');

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

  const [showNotification, setShowNotification] = useState(false);

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

    if (selectedVisibility !== 'all') {
      filtered = filtered.filter(
        (product) => product.invisible === (selectedVisibility === 'invisible')
      );
    }
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
          (isPromoEnded && searchText.toLowerCase().includes('завершена'))
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

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Текст скопирован в буфер обмена:', text);
        setShowNotification(true);
      })
      .catch((error) => {
        console.error('Не удалось скопировать текст:', error);
      });
  };

  useEffect(() => {
    if (showNotification) {
      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(notificationTimeout);
    }
  }, [showNotification]);

  return (
    <Wrapper>
      <ProductSidebar
        categories={categories}
        onCategorySelect={setCurrentCategory}
        onSubcategorySelect={setCurrentSubcategory}
      />

      <div className="p-4">
        {showNotification && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-opacity-75 animate-pulse h-10 w-56 z-10 bg-slate-600 p-4 rounded-md">
            <span
              className="text-slate-100 font-medium flex items-center"
              style={{ marginTop: '-0.5rem' }}
            >
              <CheckIcon className="mr-1 h-5 w-5" />
              Артикул скопирован
            </span>
          </div>
        )}

        {/* //!поиск */}
        <div className="col-span-full mb-4">
          <div className="flex items-center justify-between">
            <Search onFilter={setSearchText} />
            <div className="flex items-end justify-center py-2">
              <Button
                type="button"
                title="Добавить"
                onClick={openAddModal}
                styleCSSButton={
                  'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-slate-700 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 hover:text-white'
                }
                styleCSSSpan={
                  'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                }
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center space-x-2 text-slate-600">
            <input
              type="radio"
              value="visible"
              checked={selectedVisibility === 'visible'}
              onChange={() => setSelectedVisibility('visible')}
              className="form-radio text-lime-600"
            />
            <span className="ml-1">Видимые для покупателей</span>
          </label>
          <label className="flex items-center space-x-2 text-slate-600">
            <input
              type="radio"
              value="invisible"
              checked={selectedVisibility === 'invisible'}
              onChange={() => setSelectedVisibility('invisible')}
              className="form-radio text-lime-600"
            />
            <span className="ml-1">Скрытые от покупателей</span>
          </label>
          <label className="flex items-center space-x-2 text-slate-600">
            <input
              type="radio"
              value="all"
              checked={selectedVisibility === 'all'}
              onChange={() => setSelectedVisibility('all')}
              className="form-radio text-lime-600"
            />
            <span className="ml-1">Сброс фильтра</span>
          </label>
          <label className="flex items-center space-x-2 text-slate-600">
            <input
              type="checkbox"
              onChange={(e) => {
                setCurrentPage(1);
                setSearchText(e.target.checked ? 'завершена' : '');
              }}
              className="form-checkbox text-lime-600"
            />
            <span className="ml-1">Показать завершенные акции</span>
          </label>
        </div>

        {/** новая карточка */}
        <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
          {displayedProducts.map((product) => (
            <article
              key={product.id}
              className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg"
            >
              <div className="relative">
                <img
                  className="h-56 w-full object-cover"
                  src={`${VITE_URL}${product.photo}`}
                  alt={product.productName}
                />
                <div className="absolute flex h-6 w-6 items-center justify-center rounded-lg bg-slate-400 hover:bg-lime-600 top-2 right-2 ">
                  <PencilSquareIcon
                    className="mr-0 h-5 w-5 cursor-pointer text-white "
                    onClick={() => openEditModal(product)}
                  />
                </div>
                {(product.isDiscounted ||
                  product.isNew ||
                  product.invisible) && (
                  <div
                    className="absolute bottom-0 left-2 p-2 text-center flex space-x-2 items-center"
                    //className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 text-center flex space-x-2 items-center"
                  >
                    {product.isDiscounted && (
                      <p className="rounded-full border-2 border-slate-300 bg-emerald-500 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 mt-2">
                        Скидка
                      </p>
                    )}
                    {product.isNew && (
                      <p className="rounded-full border-2 border-slate-300 bg-rose-500 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 mt-2">
                        Новый
                      </p>
                    )}
                    {product.invisible && (
                      <p className="rounded-full border-2 border-slate-300 bg-slate-500 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 mt-2">
                        Скрыт
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-auto px-6 py-5">
                <span className="mb-2 flex items-center text-sm font-semibold text-slate-500">
                  <ClipboardDocumentCheckIcon
                    className="mr-1 h-5 w-5 cursor-pointer hover:text-amber-600"
                    onClick={() => handleCopyToClipboard(product.article)}
                  />

                  <span className="text-slate-700 font-medium">
                    {product.article || 'нет'}
                  </span>
                </span>

                <h3
                  // className="truncate hover:text-clip mt-4 mb-3 text-xs text-slate-700 text-center font-semibold xl:text-sm lg:text-sm "
                  className="mt-4 mb-3 text-xs text-slate-700 text-center font-semibold xl:text-sm lg:text-sm "
                >
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

                {product.promoStartDate && product.promoEndDate ? (
                  <div className="mb-2 mt-4 text-center">
                    {isToday(parseISO(product.promoEndDate)) ? (
                      <span className="text-rose-600 text-sm font-medium">
                        Акция истекает сегодня
                      </span>
                    ) : isPast(parseISO(product.promoEndDate)) ? (
                      <span className="text-amber-600 text-sm font-medium">
                        Акция завершена
                      </span>
                    ) : (
                      <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                        Период акции:
                        <p className="text-center">
                          с{' '}
                          <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                            {reverseDate(product.promoStartDate)}
                          </span>{' '}
                          по{' '}
                          <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                            {reverseDate(product.promoEndDate)}
                          </span>
                        </p>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mb-2 mt-4text-center">
                    <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                      Период акции:
                      <p className="text-center">
                        <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                          бессрочная
                        </span>
                      </p>
                    </p>
                  </div>
                )}

                {/* //! даже если описания нет, инпут остаётся, тернарка не работает, т.к. теги почему-то хранятся в бд */}
                {/* {product.description ? (
                  <div className="mb-2 mt-4 w-full">
                    <p className="text-slate-600 text-sm font-normal text-center">
                      Описание:
                    </p>
                    <div
                      id="description"
                      className="block p-2.5 h-full w-full text-justify text-sm text-slate-700 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto resize-y"
                      style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-2 mt-4 text-slate-600 text-sm font-medium text-center">
                    Описание отсутствует
                  </div>
                )} */}
              </div>
              {/* <div className="flex items-end justify-center mb-4">
                <Button
                  type="button"
                  title="Редактировать"
                  onClick={() => openEditModal(product)}
                  styleCSSButton={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 hover:text-white`}
                  styleCSSSpan={
                    'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                  }
                />
              </div> */}
            </article>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

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
