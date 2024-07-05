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
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import currentProduct from '../../../Redux/thunks/Products/getcurrentProduct';
import LoadingAnimation from '../../Loading/Loading';

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
  img: string;
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
  const [isLoading, setLoading] = useState(false);
  const [isLoadingProd, setLoadingProd] = useState(true);

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

  // для плашки Вы сейчас здесь
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
  const [searchText, setSearchText] = useState('');
  const [showNew, setShowNew] = useState('');
  const [showDiscounted, setshowDiscounted] = useState('');
  const [withoutIsDiscounted, setwWthoutIsDiscounted] = useState('');

  const [showNomenclatureCode, setShowNomenclatureCode] =
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
    const fetchData = async () => {
      try {
        await dispatch(getProducts());
        await dispatch(getCategory());
        await dispatch(getSubcategory());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoadingProd(false);
    };
    fetchData();
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
    if (showNomenclatureCode) {
      const notificationTimeout = setTimeout(() => {
        setShowNomenclatureCode(false);
      }, 3000);

      return () => clearTimeout(notificationTimeout);
    }
  }, [showNomenclatureCode]);

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
    }

    return filtered;
  };
  const filteredProdPag = filterProducts();
  const totalMatches = filteredProdPag.length;
  const displayedProducts = filterProducts().slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalMatches / itemsPerPage);

  const openAddModal = (): void => {
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

  const closeAddModal = (): void => {
    setSelectedProduct(null);
    setEditedProduct(null);
    setModalOpen(false);
    dispatch(getProducts());
  };

  const openEditModal = async (product: IProduct): Promise<void> => {
    const productId = product.id;
    const res = await dispatch(currentProduct(productId));
    const result = unwrapResult(res);
    setSelectedProduct(result);
    setEditedProduct(result);
    setAddingMode(false);
    setModalOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditedProduct(null);
    setModalOpen(false);
    dispatch(getProducts());
  };

  const handleSaveAdd = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        setErrorNotification(null);
        setShowNotificationAddProduct(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddProduct(true);
      add = error;
    }
    return add;
  };

  const handleSaveEdit = async (editedProduct: IProduct): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        setErrorNotification(null);
        setShowNotificationEditProduct(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
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

  // const handleCopyToClipboard = (text: string): void => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       console.log('Текст скопирован в буфер обмена:', text);
  //       setShowNomenclatureCode(true);
  //     })
  //     .catch((error) => {
  //       console.error('Не удалось скопировать текст:', error);
  //     });
  // };

  //устаревший метод не удалять
  const handleCopyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // console.log('Текст скопирован в буфер обмена:', text);
    setShowNomenclatureCode(true);
  };

  //* сбрасывает состояния чекбоксов и радиокнопок
  const resetFirstComponentState = (): void => {
    setCurrentPage(1);
    setSelectedVisibility('all');
    setShowNew('');
    setshowDiscounted('');
    setSearchText('');
    setwWthoutIsDiscounted('');
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement;
      inputCheckbox.checked = false;
    });
  };

  return (
    <Wrapper>
      {showNotificationAddProduct && (
        <PopUpNotification
          titleText={'Добавлен новый продукт'}
          name={editedProduct?.productName}
        />
      )}
      {showNotificationEditProduct && (
        <PopUpNotification
          titleText={'Внесены изменения в продукт'}
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

      {isLoadingProd ? (
        <div className="flex items-center justify-center h-full">
          <div className="relative h-16 w-16">
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-4 border-gray-300 rounded-full animate-spin"></div>
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-t-4 border-green-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <ProductSidebar
            addModal={openAddModal}
            categories={categories}
            onCategorySelect={setCurrentCategory}
            onSubcategorySelect={setCurrentSubcategory}
            onActiveCategory={setActiveCategory}
            onActiveSubcategory={setActiveSubcategory}
            resetFirstComponentState={resetFirstComponentState}
          />

          <div className="p-4">
            {showNomenclatureCode && (
              <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-opacity-75 animate-pulse h-10 w-80 z-10 bg-slate-600 p-4 rounded-md">
                <span
                  className="text-slate-100 font-medium flex items-center"
                  style={{ marginTop: '-0.5rem' }}
                >
                  <CheckIcon className="mr-1 h-5 w-5" />
                  Код номенклатуры скопирован
                </span>
              </div>
            )}

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
              <div className="flex items-center justify-between mb-2">
                <Search onFilter={setSearchText} />
              </div>

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
                    }}
                    className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <span className="ml-1">Текущие акции</span>
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
                    }}
                    className="w-4 h-4 text-amber-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <span className="ml-1">Товары без акции</span>
                </label>
              </div>
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
                              onClick={() =>
                                handleCopyToClipboard(product.article)
                              }
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
                                      <span className="underline decoration-sky-500 decoration-1 text-sm font-medium">
                                        {reverseDate(product.promoStartDate)}
                                      </span>{' '}
                                      по{' '}
                                      <span className="underline decoration-sky-500 decoration-1 text-sm font-medium">
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
                                    <span className="underline decoration-sky-500 decoration-1 text-sm font-medium">
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
            <div className="relative ">
              {isLoading && (
                <div className="fixed inset-0 z-20 backdrop-blur-lg flex items-center justify-center ">
                  {/* <div className="bg-white p-1 rounded-sm shadow-xs  "> */}
                  <div className="bg-white p-1 rounded-sm z-10 py-20 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center ">
                    <LoadingAnimation />
                  </div>
                </div>
              )}

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
                  openEditModal={openEditModal}
                />
              )}
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Products;
