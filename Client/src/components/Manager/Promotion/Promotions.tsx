import { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { VITE_URL } from '../../../VITE_URL';
// import PromotionsModal from './PromotionsModal';
import Pagination from '../../../ui/Paggination';
import { isToday, parseISO, isPast } from 'date-fns';
import { unwrapResult } from '@reduxjs/toolkit';
import getPromotions from '../../../Redux/thunks/Promotion/getPromotion.api';
import editPromotion from '../../../Redux/thunks/Promotion/editPromotion.api';
import addPromotion from '../../../Redux/thunks/Promotion/addPromotion.api';
import Search from '../../../ui/Search';
import PromotionsModal from './PromotionsModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../../ui/Button';

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

const Promotions: FC = () => {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector<IPromotion[]>(
    (state) => state.promotionSlice.data
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
      invisible: true,
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
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

        {/* Карусель */}
        {displayedPromotions.some((promotion) => promotion.carousel) && (
          <div className="col-span-full">
            <Slider {...settings} className="rounded-lg  slick-slider">
              {displayedPromotions
                .filter((promotion) => promotion.carousel)
                .map((promotion) => (
                  <article key={promotion.id} className="relative slick-slide">
                    {/* Здесь размещаете содержимое карусели */}
                    <div className="mb-4 mx-4 ">
                      {' '}
                      {/* Увеличено расстояние между слайдами с помощью mx-4 */}
                      <img
                        className="w-full max-h-60 object-cover rounded-lg"
                        src={`${VITE_URL}${promotion.photo}`}
                        alt={promotion.title}
                      />
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded"
                      onClick={() => openEditModal(promotion)}
                    >
                      Редактировать
                    </button>
                  </article>
                ))}
            </Slider>
          </div>
        )}

        {/* Карточки */}
        <div className="col-span-full  mt-8">
          <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
            {displayedPromotions
              .filter((promotion) => !promotion.carousel)
              .map((promotion) => (
                <article
                  key={promotion.id}
                  className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 hover:shadow-lg"
                >
                  {/* Здесь размещаете содержимое карточки */}
                  <div className="relative">
                    <img
                      className="h-56 w-full object-cover"
                      src={`${VITE_URL}${promotion.photo}`}
                      alt={promotion.title}
                    />
                  </div>

                  <div className="flex-auto px-6 py-5">
                    <h3 className="mt-4 mb-3 text-xs text-slate-700 text-center font-semibold xl:text-sm lg:text-sm ">
                      {promotion.title}
                    </h3>

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
                            <p className="text-center">
                              с{' '}
                              <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                {reverseDate(promotion.dateStart)}
                              </span>{' '}
                              по{' '}
                              <span className="underline decoration-sky-500 decoration-2 decoration-dotted text-sm font-medium">
                                {reverseDate(promotion.dateEnd)}
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

                    {promotion.carousel ? (
                      <p
                        //! а это где-то отображается????
                        className="mb-2 text-slate-600 text-sm font-normal text-center"
                      >
                        <span className="text-lime-600 font-medium">
                          Акция в карусели
                        </span>
                      </p>
                    ) : (
                      <p className="mb-2 text-slate-600 text-sm font-normal text-center">
                        <span className="text-amber-600 font-medium">
                          Акция вне основной карусели
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-end justify-center mb-4">
                    <Button
                      type="button"
                      title="Редактировать"
                      onClick={() => openEditModal(promotion)}
                      styleCSSButton={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 hover:text-white`}
                      styleCSSSpan={
                        'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                      }
                    />
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        /> */}
      </div>
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

export default Promotions;
