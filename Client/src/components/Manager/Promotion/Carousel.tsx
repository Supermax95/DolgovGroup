import { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { VITE_URL } from '../../../VITE_URL';
import { isToday, parseISO, isPast } from 'date-fns';
import { unwrapResult } from '@reduxjs/toolkit';
import getPromotions from '../../../Redux/thunks/Promotion/getPromotion.api';
import editPromotion from '../../../Redux/thunks/Promotion/editPromotion.api';
import addPromotion from '../../../Redux/thunks/Promotion/addPromotion.api';
import Search from '../../../ui/Search';
import PromotionsModal from './PromotionsModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import PromotionSidebar from './PromotionSidebar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import currentPromotion from '../../../Redux/thunks/Promotion/getcurrentPromotion.api';
import LoadingAnimation from '../../Loading/Loading';

export interface Promotion {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  carousel: boolean;
  invisible: boolean;
  photo?: string;
}

const Carousel: FC = () => {
  const dispatch = useAppDispatch();
  const carouselPromotions = useAppSelector<Promotion[]>(
    (state) => state.promotionSlice.data
  );

  const promotions = carouselPromotions.filter(
    (promotion) => promotion.carousel === true
  );

  // остальное
  const [isModalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingPromo, setLoadingPromo] = useState(true);

  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedPromotion, setEditedPromotion] = useState<
    Promotion | null | undefined
  >(null);

  const [searchText, setSearchText] = useState('');

  //* всплывающие уведомления
  const [showNotificationAddPromo, setShowNotificationAddPromo] =
    useState<boolean>(false);
  const [showNotificationEditPromo, setShowNotificationEditPromo] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [showErrorNotificationAddPromo, setShowErrorNotificationAddPromo] =
    useState<boolean>(false);
  const [showErrorNotificationEditPromo, setShowErrorNotificationEditPromo] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getPromotions());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoadingPromo(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (
      showNotificationAddPromo ||
      showErrorNotificationAddPromo ||
      showNotificationEditPromo ||
      showErrorNotificationEditPromo
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAddPromo(false);
        setShowErrorNotificationAddPromo(false);
        setShowNotificationEditPromo(false);
        setShowErrorNotificationEditPromo(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationAddPromo,
    showErrorNotificationAddPromo,
    showNotificationEditPromo,
    showErrorNotificationEditPromo,
  ]);

  const itemsPerPage = 30;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filterPromotions = () => {
    let filtered = promotions;

    if (searchText !== '') {
      filtered = filtered.filter((promotion) => {
        const promotionFields = [
          String(promotion.title),
          String(promotion.description),
          String(promotion.dateStart),
          String(promotion.dateEnd),
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        const isPromoEnded =
          promotion.dateEnd && isPast(parseISO(promotion.dateEnd));

        return (
          searchTerms.every((term) =>
            promotionFields.some((field) => field.toLowerCase().includes(term))
          ) ||
          (isPromoEnded && searchText.toLowerCase().includes('завершена'))
        );
      });
    }

    return filtered;
  };

  const displayedPromotions = filterPromotions().slice(startIndex, endIndex);

  const openAddModal = () => {
    setAddingMode(true);
    setEditedPromotion({
      id: 0,
      title: '',
      description: '',
      dateStart: '',
      dateEnd: '',
      carousel: false,
      invisible: false,
    });
    setModalOpen(true);
  };

  const closeAddModal = () => {
    setSelectedPromotion(null);
    setEditedPromotion(null);
    setModalOpen(false);
    dispatch(getPromotions());
  };

  const openEditModal = async (promotion: Promotion) => {
    const promotionId = promotion.id;
    const res = await dispatch(currentPromotion(promotionId));
    const result = unwrapResult(res);
    setSelectedPromotion(result);
    setEditedPromotion(result);
    setAddingMode(false);
    setModalOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const closeEditModal = () => {
    setSelectedPromotion(null);
    setEditedPromotion(null);
    setModalOpen(false);
    dispatch(getPromotions());
  };

  const handleSaveAdd = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let add = {} as any;
    try {
      if (editedPromotion) {
        const resultAction = await dispatch(
          addPromotion({
            newPromotion: editedPromotion,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setErrorNotification(null);
        setShowNotificationAddPromo(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddPromo(true);
      add = error;
    }
    return add;
  };

  const handleSaveEdit = async (editedPromotion: Promotion) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let add = {} as any;

    try {
      if (selectedPromotion) {
        const resultAction = await dispatch(
          editPromotion({
            newInfo: editedPromotion,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setErrorNotification(null);
        setShowNotificationEditPromo(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationEditPromo(true);
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
      {showNotificationAddPromo && (
        <PopUpNotification
          titleText={'Акция создана'}
          bodyText={`Наименование акции:`}
          name={editedPromotion?.title}
        />
      )}
      {showNotificationEditPromo && (
        <PopUpNotification
          titleText={'Внесены изменения'}
          bodyText={`Наименование акции:`}
          name={editedPromotion?.title}
        />
      )}

      {/* //!уведомления об ошибках */}
      {showErrorNotificationAddPromo && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationEditPromo && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}

      {isLoadingPromo ? (
        <div className="flex items-center justify-center h-full">
          <div className="relative h-16 w-16">
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-4 border-gray-300 rounded-full animate-spin"></div>
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-t-4 border-green-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <PromotionSidebar openAddModal={openAddModal} />
          <div className="p-4 w-[1020px]">
            <h1 className="text-xl text-lime-600 font-medium text-center mb-2">
              Акции в карусели
            </h1>

            <div className="col-span-full mb-4">
              <div className="flex items-center justify-between">
                <Search onFilter={setSearchText} />
              </div>
            </div>

            {displayedPromotions.some((promotion) => promotion) && (
              <section className="max-w-6xl mx-auto px-4 ">
                <Swiper
                  modules={[FreeMode, Navigation, Pagination]}
                  breakpoints={{
                    340: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    700: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                  }}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayedPromotions.length &&
                    displayedPromotions
                      .filter((promotion) => !promotion.invisible)
                      .map((promotion) => (
                        <SwiperSlide key={promotion.id}>
                          <div className=" mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-slate-900 transition hover:translate-y-2 hover:shadow-lg">
                            <div className="relative">
                              <div className="absolute flex h-6 w-6 items-center justify-center rounded-lg bg-slate-400 hover:bg-lime-600 top-2 right-2 ">
                                <PencilSquareIcon
                                  className="mr-0 h-5 w-5 cursor-pointer text-white "
                                  onClick={() => openEditModal(promotion)}
                                />
                              </div>
                              <img
                                className="object-center object-cover h-auto w-full"
                                src={`${VITE_URL}${promotion.photo}`}
                                alt={promotion.title}
                              />
                              {promotion.invisible && (
                                <div className="absolute bottom-0 left-2 p-2 text-center flex space-x-2 items-center">
                                  {promotion.invisible && (
                                    <p className="rounded-full border-2 border-slate-300 bg-slate-500 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 mt-2">
                                      Скрыта
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="text-center py-8 sm:py-6">
                              <p className="text-xl text-gray-700 font-bold mb-2">
                                {promotion.title}
                              </p>

                              {promotion.dateStart && promotion.dateEnd ? (
                                <div className="mb-2 mt-4 text-center">
                                  {isToday(parseISO(promotion.dateEnd)) ? (
                                    <span className="text-rose-600 text-sm font-medium">
                                      Акция истекает сегодня
                                    </span>
                                  ) : isPast(parseISO(promotion.dateEnd)) ? (
                                    <span className="text-amber-600 text-sm font-medium">
                                      Акция завершена
                                    </span>
                                  ) : (
                                    <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                                      Период акции:
                                      <br />
                                      <span className="text-center">
                                        с{' '}
                                        <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                          {reverseDate(promotion.dateStart)}
                                        </span>{' '}
                                        по{' '}
                                        <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                          {reverseDate(promotion.dateEnd)}
                                        </span>
                                      </span>
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div className="mb-2 mt-4text-center">
                                  <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                                    Период акции: <br />
                                    <span className="text-center">
                                      <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                        бессрочная
                                      </span>
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                </Swiper>
              </section>
            )}

            {displayedPromotions.filter((promotion) => !promotion.invisible)
              .length === 0 && (
              <div className="flex items-center justify-center max-w-screen-lg mx-auto mt-8 p-8 bg-white rounded-xl backdrop-blur-lg">
                <span className="text-slate-600 text-sm font-normal">
                  Актуальные акции отсутствуют{' '}
                </span>
              </div>
            )}

            <div className="my-6 rounded-md shadow-sm border-b-2 border-orange-300"></div>

            {displayedPromotions.some((promotion) => promotion) && (
              <section className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedPromotions.length &&
                    displayedPromotions
                      .filter((promotion) => promotion.invisible)
                      .map((promotion) => (
                        <div
                          key={promotion.id}
                          className=" mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-slate-900 transition hover:translate-y-2 hover:shadow-lg"
                        >
                          <div className="relative">
                            <div className="absolute flex h-6 w-6 items-center justify-center rounded-lg bg-slate-400 hover:bg-lime-600 top-2 right-2 ">
                              <PencilSquareIcon
                                className="mr-0 h-5 w-5 cursor-pointer text-white "
                                onClick={() => openEditModal(promotion)}
                              />
                            </div>
                            <img
                              className="object-center object-cover h-auto w-full"
                              src={`${VITE_URL}${promotion.photo}`}
                              alt={promotion.title}
                            />
                            {promotion.invisible && (
                              <div className="absolute bottom-0 left-2 p-2 text-center flex space-x-2 items-center">
                                {promotion.invisible && (
                                  <p className="rounded-full border-2 border-slate-300 bg-slate-500 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 mt-2">
                                    Скрыта
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="text-center py-8 sm:py-6">
                            <p className="text-xl text-gray-700 font-bold mb-2">
                              {promotion.title}
                            </p>

                            {promotion.dateStart && promotion.dateEnd ? (
                              <div className="mb-2 mt-4 text-center">
                                {isToday(parseISO(promotion.dateEnd)) ? (
                                  <span className="text-rose-600 text-sm font-medium">
                                    Акция истекает сегодня
                                  </span>
                                ) : isPast(parseISO(promotion.dateEnd)) ? (
                                  <span className="text-amber-600 text-sm font-medium">
                                    Акция завершена
                                  </span>
                                ) : (
                                  <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                                    Период акции:
                                    <br />
                                    <span className="text-center">
                                      с{' '}
                                      <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                        {reverseDate(promotion.dateStart)}
                                      </span>{' '}
                                      по{' '}
                                      <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                        {reverseDate(promotion.dateEnd)}
                                      </span>
                                    </span>
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="mb-2 mt-4text-center">
                                <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                                  Период акции: <br />
                                  <span className="text-center">
                                    <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                      бессрочная
                                    </span>
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                </div>
              </section>
            )}

            {displayedPromotions.filter((promotion) => promotion.invisible)
              .length === 0 && (
              <div className="flex items-center justify-center max-w-screen-lg mx-auto mt-8 p-8 bg-white rounded-xl backdrop-blur-lg">
                <span className="text-slate-600 text-sm font-normal">
                  Скрытые акции в карусели отсутствуют{' '}
                </span>
              </div>
            )}
          </div>
          <div className="relative ">
            {isLoading && (
              <div className="fixed inset-0 z-20 backdrop-blur-lg flex items-center justify-center ">
                {/* <div className="bg-white p-1 rounded-sm shadow-xs  "> */}
                <div className="bg-white p-1 rounded-sm z-10 py-20 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center ">
                  <LoadingAnimation />
                </div>
              </div>
            )}
            {isModalOpen && (selectedPromotion || isAddingMode) && (
              <PromotionsModal
                isOpen={isModalOpen}
                promotion={selectedPromotion}
                onSaveEdit={handleSaveEdit}
                onSaveAdd={handleSaveAdd}
                onCloseAddModal={closeAddModal}
                onCloseEditModal={closeEditModal}
                isAddingMode={isAddingMode}
                editedPromotion={editedPromotion}
                setEditedPromotion={setEditedPromotion}
                openEditModal={openEditModal}
              />
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Carousel;
