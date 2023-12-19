import { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { VITE_URL } from '../../../VITE_URL';
// import Pagination from '../../../ui/Paggination';
import { isToday, parseISO, isPast } from 'date-fns';
import { unwrapResult } from '@reduxjs/toolkit';
import getPromotions from '../../../Redux/thunks/Promotion/getPromotion.api';
import editPromotion from '../../../Redux/thunks/Promotion/editPromotion.api';
import addPromotion from '../../../Redux/thunks/Promotion/addPromotion.api';
import Search from '../../../ui/Search';
import PromotionsModal from './PromotionsModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../../ui/Button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import PromotionSidebar from './PromotionSidebar';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export interface IPromotion {
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
  const carouselPromotions = useAppSelector<IPromotion[]>(
    (state) => state.promotionSlice.data
  );

  const promotions = carouselPromotions.filter(
    (promotion) => promotion.carousel === true
  );

  // остальное
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPromotion, setSelectedPromotion] = useState<IPromotion | null>(
    null
  );
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedPromotion, setEditedPromotion] = useState<
    IPromotion | null | undefined
  >(null);
  const [axiosError, setAxiosError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

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
  const totalPages = Math.ceil(filterPromotions().length / itemsPerPage);

  const resetAxiosError = () => {
    setAxiosError(null);
  };

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

  const openEditModal = (promotion: IPromotion) => {
    setSelectedPromotion(promotion);
    setEditedPromotion({ ...promotion });
    setAddingMode(false);
    setModalOpen(true);
    dispatch(getPromotions());
  };

  const closeEditModal = () => {
    setSelectedPromotion(null);
    setEditedPromotion(null);
    setModalOpen(false);
    dispatch(getPromotions());
  };

  const handleSaveAdd = async () => {
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
        setAxiosError(null);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setAxiosError(error as string | null);
      add = error;
    }
    return add;
  };

  const handleSaveEdit = async (editedPromotion: IPromotion) => {
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
    return `${day}-${month}-${year}`;
  };

  return (
    <Wrapper>
      <PromotionSidebar />
      <div className="p-4">
        <h1 className="text-xl text-lime-600 font-medium ">Акции в карусели</h1>

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
                      <div className=" mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-slate-900 hover:shadow-lg">
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
                            <div className="absolute flex h-6 w-6 p-2 items-center justify-center rounded-lg bg-slate-400 bottom-2 left-8 ">
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
          <div className="flex items-center justify-center">
            <span className="text-slate-600 text-sm font-normal">
              Актуальные акции отсутствуют{' '}
            </span>
          </div>
        )}

        <div className="my-6 rounded-md shadow-sm border-b-2 border-orange-300"></div>

        {displayedPromotions.some((promotion) => promotion) && (
          <section className="max-w-6xl mx-auto px-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPromotions.length &&
                displayedPromotions
                  .filter((promotion) => promotion.invisible)
                  .map((promotion) => (
                    <div
                      key={promotion.id}
                      className=" mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-slate-900 hover:shadow-lg"
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
                          <div className="absolute flex h-6 w-6 p-2 items-center justify-center rounded-lg bg-slate-400 bottom-2 left-8 ">
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
          <div className="flex items-center justify-center">
            <span className="text-slate-600 text-sm font-normal">
              Скрытые акции в карусели отсутствуют{' '}
            </span>
          </div>
        )}
      </div>

      {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        /> */}

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
          axiosError={axiosError}
          resetAxiosError={resetAxiosError}
        />
      )}
    </Wrapper>
  );
};

export default Carousel;
