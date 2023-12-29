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
  ChevronRightIcon,
  PencilSquareIcon,
  Square2StackIcon,
} from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';
import { Toaster } from 'sonner';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';

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
  // console.log('currentCategory', currentCategory);

  const [currentSubcategory, setCurrentSubcategory] =
    useState<ISubcategory | null>(null);
  // console.log('currentSubcategory', currentSubcategory);

  // // для плашки Вы сейчас здесь
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);

  const [activeSubcategory, setActiveSubcategory] =
    useState<ISubcategory | null>(null);

  // остальное
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState<
    IProduct | null | undefined
  >(null);
  // const [axiosError, setAxiosError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [showNew, setShowNew] = useState('');
  const [showDiscounted, setshowDiscounted] = useState('');
  const [withoutIsDiscounted, setwWthoutIsDiscounted] = useState('');

  const [showNotificationArticle, setShowNotificationArticle] =
    useState<boolean>(false);

  //* всплывающие уведомления
  const [showNotificationAddProduct, setShowNotificationAddProduct] =
    useState<boolean>(false);
  const [showNotificationEditProduct, setShowNotificationEditProduct] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [showErrorNotificationAddProduct, setShowErrorNotificationAddProduct] =
    useState<boolean>(false);
  const [
    showErrorNotificationEditProduct,
    setShowErrorNotificationEditProduct,
  ] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubcategory());
  }, [dispatch]);

  useEffect(() => {
    if (
      showNotificationAddProduct ||
      showErrorNotificationAddProduct ||
      showNotificationEditProduct ||
      showErrorNotificationEditProduct
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAddProduct(false);
        setShowErrorNotificationAddProduct(false);
        setShowNotificationEditProduct(false);
        setShowErrorNotificationEditProduct(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationAddProduct,
    showErrorNotificationAddProduct,
    showNotificationEditProduct,
    showErrorNotificationEditProduct,
  ]);

  useEffect(() => {
    if (showNotificationArticle) {
      const notificationTimeout = setTimeout(() => {
        setShowNotificationArticle(false);
      }, 3000);

      return () => clearTimeout(notificationTimeout);
    }
  }, [showNotificationArticle]);

  const itemsPerPage = 30;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filterProducts = () => {
    let filtered = products;

    if (showNew) {
      filtered = filtered.filter((product) => product.isNew === true);
    }

    if (showDiscounted) {
      filtered = filtered.filter((product) => product.isDiscounted === true);
    }

    if (withoutIsDiscounted) {
      filtered = filtered.filter((product) => product.isDiscounted === false);
    }

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
          product.promoEndDate &&
          isPast(parseISO(product.promoEndDate)) &&
          !isToday(parseISO(product.promoEndDate));

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

      /** если для хотя бы одного элемента product в массиве filtered условие внутри some возвращает true,
       * то этот product будет включен в результирующий массив filtered. */
      filtered = filtered.filter((product) => {
        //console.log('product', product.subcategoryId);
        return subcategoriesOfCurrentCategory.some(
          (sub) => sub.id === product.subcategoryId
        );
      });
    }

    //* Фильтрация по текущей подкатегории
    if (currentSubcategory) {
      filtered = filtered.filter(
        (product) => product.subcategoryId === currentSubcategory.id
      );
      // console.log('filtered', filtered);
    }

    return filtered;
  };
  const filteredProdPag = filterProducts();
  const totalMatches = filteredProdPag.length;
  const displayedProducts = filterProducts().slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalMatches / itemsPerPage);
  // const totalPages = Math.ceil(filterProducts().length / itemsPerPage);

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

  // const resetAxiosError = () => {
  //   setAxiosError(null);
  // };

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
        // setAxiosError(null);
        setErrorNotification(null);
        setShowNotificationAddProduct(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      // setAxiosError(error as string | null);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddProduct(true);
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
        // setAxiosError(null);
        setErrorNotification(null);
        setShowNotificationEditProduct(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      // setAxiosError(error as string | null);
      setErrorNotification(error as string | null);
      setShowErrorNotificationEditProduct(true);
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
        setShowNotificationArticle(true);
      })
      .catch((error) => {
        console.error('Не удалось скопировать текст:', error);
      });
  };

  // //устаревший метод не удалять
  // const handleCopyToClipboard = (text: string) => {
  //   const textarea = document.createElement('textarea');
  //   textarea.value = text;
  //   document.body.appendChild(textarea);
  //   textarea.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(textarea);

  //   console.log('Текст скопирован в буфер обмена:', text);
  //   setShowNotificationArticle(true);
  // };

  return (
    <Wrapper>
      <Toaster position="bottom-left" expand={true} />
      {showNotificationAddProduct && (
        <PopUpNotification
          titleText={'Добавлен новый продукт'}
          // bodyText={`Наименование акции:`}
          name={editedProduct?.productName}
        />
      )}
      {showNotificationEditProduct && (
        <PopUpNotification
          titleText={'Внесены изменения'}
          // bodyText={`Наименование продукта:`}
          name={editedProduct?.productName}
        />
      )}
      {/* //!уведомления об ошибках */}
      {showErrorNotificationAddProduct && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationEditProduct && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      <ProductSidebar
        addModal={openAddModal}
        categories={categories}
        onCategorySelect={setCurrentCategory}
        onSubcategorySelect={setCurrentSubcategory}
        onActiveCategory={setActiveCategory}
        onActiveSubcategory={setActiveSubcategory}
      />

      <div className="p-4">
        {showNotificationArticle && (
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
        {/* 
        <h1 className="text-xl text-lime-600 font-medium text-center">
          Продукты
        </h1> */}

        <div className="flex items-center space-x-1">
          <span className="text-slate-600 text-sm font-normal my-2">
            Каталог
          </span>

          {activeCategory || activeSubcategory ? (
            <>
              {activeCategory && (
                <>
                  <div>
                    <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mx-1" />
                  </div>
                  <span className="text-slate-600 text-sm font-normal mx-2 my-2">
                    {activeCategory.categoryName}
                  </span>
                </>
              )}

              {activeSubcategory && (
                <>
                  <div>
                    <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mx-1" />
                  </div>
                  <span className="text-slate-600 text-sm font-normal mx-2 my-2">
                    {activeSubcategory.subcategoryName}
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              <div>
                <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mx-1" />
              </div>
              <span className="text-slate-600 text-sm font-normal mx-2 my-2">
                Все продукты
              </span>
            </>
          )}
        </div>

        <div className="col-span-full">
          {/* <div className="flex items-end justify-center">
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
          </div> */}
          <div className="flex items-center justify-between mb-2">
            <Search onFilter={setSearchText} />
          </div>

          {/* <div className="main flex flex-col overflow-hidden select-none px-4 mb-2">
            <div className="flex space-x-3 py-2 px-2">
              <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
                <input
                  type="checkbox"
                  value="isNew"
                  onChange={(e) => {
                    setCurrentPage(1);
                    setShowNew(e.target.checked ? 'isNew' : '');
                  }}
                  className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
                />
                <span className="ml-1">Новый товар</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setCurrentPage(1);
                    setshowDiscounted(e.target.checked ? 'isDiscounted' : '');
                    // console.log(e.target.checked);
                  }}
                  className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
                />
                <span className="ml-1">Текущие акциии</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setCurrentPage(1);
                    setSearchText(e.target.checked ? 'завершена' : '');
                  }}
                  className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
                />
                <span className="ml-1">Завершенные акции</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setCurrentPage(1);
                    setwWthoutIsDiscounted(
                      e.target.checked ? 'withoutIsDiscounted' : ''
                    );
                    console.log(e.target.checked);
                  }}
                  className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
                />
                <span className="ml-1">Товары без акции</span>
              </label>
            </div>{' '}
          </div> */}

          <div className="main flex flex-col border rounded-full overflow-hidden select-none px-4">
            <div className="flex space-x-3 py-2 px-2">
              <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
                <input
                  type="radio"
                  value="visible"
                  checked={selectedVisibility === 'visible'}
                  onChange={() => {
                    setCurrentPage(1);
                    setSelectedVisibility('visible');
                  }}
                  className="w-4 h-4 text-slate-400 text-sm font-normal bg-slate-100 border-slate-300 rounded-full focus:ring-slate-500"
                />
                <span className="ml-1">Видимые для покупателей</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
                <input
                  type="radio"
                  value="invisible"
                  checked={selectedVisibility === 'invisible'}
                  onChange={() => {
                    setCurrentPage(1);
                    setSelectedVisibility('invisible');
                  }}
                  className="w-4 h-4 text-slate-400 text-sm font-normal bg-slate-100 border-slate-300 rounded-full focus:ring-slate-500"
                />
                <span className="ml-1">Скрытые от покупателей</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
                <input
                  type="radio"
                  value="all"
                  checked={selectedVisibility === 'all'}
                  onChange={() => {
                    setCurrentPage(1);
                    setSelectedVisibility('all');
                  }}
                  className="w-4 h-4 text-slate-400 text-sm font-normal bg-slate-100 border-slate-300 rounded-full focus:ring-slate-500"
                />
                <span className="ml-1">Сброс фильтра видимости</span>
              </label>
            </div>
          </div>
        </div>
        <div className="main flex flex-col overflow-hidden select-none px-4 mb-2">
          <div className="flex space-x-3 py-2 px-2">
            <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
              <input
                type="checkbox"
                value="isNew"
                onChange={(e) => {
                  setCurrentPage(1);
                  setShowNew(e.target.checked ? 'isNew' : '');
                }}
                className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
              />
              <span className="ml-1">Новый товар</span>
            </label>
            <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => {
                  setCurrentPage(1);
                  setshowDiscounted(e.target.checked ? 'isDiscounted' : '');
                  // console.log(e.target.checked);
                }}
                className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
              />
              <span className="ml-1">Текущие акциии</span>
            </label>
            <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchText(e.target.checked ? 'завершена' : '');
                }}
                className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
              />
              <span className="ml-1">Завершенные акции</span>
            </label>
            <label className="flex items-center space-x-2 text-slate-600 text-sm font-normal  cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => {
                  setCurrentPage(1);
                  setwWthoutIsDiscounted(
                    e.target.checked ? 'withoutIsDiscounted' : ''
                  );
                  console.log(e.target.checked);
                }}
                className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
              />
              <span className="ml-1">Товары без акции</span>
            </label>
          </div>{' '}
        </div>

        <section className="max-w-6xl mx-auto px-4 ">
          {/** новая карточка */}
          <div className="mx-auto max-w-screen-lg">
            <div
              className={`grid justify-center  ${
                displayedProducts.length
                  ? 'gap-4 px-8 sm:grid-cols-2 md:grid-cols-3'
                  : 'items-center'
              }`}
            >
              {displayedProducts.length ? (
                displayedProducts.map((product) => (
                  <article
                    key={product.id}
                    className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        className="h-full w-full object-contain"
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
                        <Square2StackIcon
                          className="mr-1 h-5 w-5 cursor-pointer hover:text-amber-600"
                          onClick={() => handleCopyToClipboard(product.article)}
                        />

                        <span className="text-slate-700 font-medium">
                          {product.article || 'Отсутствует'}
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
                          <del className="text-slate-600 text-sm font-medium">
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

                      {!product.isDiscounted && (
                        <div className="text-center">
                          <span className="text-lime-600 text-sm font-medium">
                            Акции нет
                          </span>
                        </div>
                      )}

                      {product.isDiscounted ? (
                        product.promoStartDate && product.promoEndDate ? (
                          <div className="mb-2 mt-4 text-center">
                            {isToday(parseISO(product.promoEndDate)) ? (
                              <span className="text-rose-600 text-sm font-medium">
                                Акция истекает сегодня
                              </span>
                            ) : (
                              <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                                Период акции:
                                <br />
                                <span className="text-center">
                                  с{' '}
                                  <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                    {reverseDate(product.promoStartDate)}
                                  </span>{' '}
                                  по{' '}
                                  <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                    {reverseDate(product.promoEndDate)}
                                  </span>
                                </span>
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="mb-2 mt-4 text-center">
                            <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                              Период акции: <br />
                              <span className="text-center">
                                <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                  бессрочная
                                </span>
                              </span>
                            </p>
                          </div>
                        )
                      ) : (
                        isPast(parseISO(product.promoEndDate)) && (
                          <div className="mb-2 mt-0 text-center">
                            <span className="text-amber-600 text-sm font-medium">
                              Акция завершена
                            </span>
                          </div>
                        )
                      )}

                      {/* //! даже если описания нет, инпут остаётся, тернарка не работает, т.к. теги почему-то хранятся в бд */}
                      {/* {product.description ? (
                  <div className="mb-2 mt-4 w-full">
                    <p className="text-slate-600 text-sm font-normal  text-sm font-normal text-center">
                      Описание:
                    </p>
                    <div
                      id="description"
                      className="block p-2.5 h-full w-full text-justify text-sm text-slate-700 bg-white rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto resize-y"
                      style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-2 mt-4 text-slate-600 text-sm font-normal  text-sm font-medium text-center">
                    Описание отсутствует
                  </div>
                )} */}
                    </div>
                  </article>
                ))
              ) : (
                <div className="flex items-center justify-center py-4">
                  <span className="text-slate-600 text-md font-normal">
                    Отсутствуют записи о продуктах в каталоге
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

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
            // axiosError={axiosError}
            // resetAxiosError={resetAxiosError}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Products;
