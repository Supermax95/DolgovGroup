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
          (isPromoEnded && searchText.toLowerCase().includes('закончилась'))
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedPromotions
              .filter((promotion) => !promotion.carousel)
              .map((promotion) => (
                <article
                  key={promotion.id}
                  className="relative flex flex-col overflow-hidden rounded-lg border bg-white dark:bg-neutral-700 h-full"
                >
                  {/* Здесь размещаете содержимое карточки */}
                  <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between h-full">
                    <div className="mb-2">
                      <img
                        className="h-full w-full object-cover rounded-t-lg transition-all duration-300 group-hover:scale-125 flex-shrink-0"
                        src={`${VITE_URL}${promotion.photo}`}
                        alt={promotion.title}
                      />
                      <div className="flex">
                        <p className="mr-3 text-xs font-semibold text-gray-700">
                          {promotion.title}
                        </p>
                      </div>
                    </div>
                    <div>
                      {promotion.dateStart && promotion.dateEnd ? (
                        <div className="mb-2 text-xs text-gray-500">
                          Промо:
                          {isToday(parseISO(promotion.dateEnd)) ? (
                            <span className="text-red-500">
                              {' '}
                              Акция заканчивается сегодня
                            </span>
                          ) : isPast(parseISO(promotion.dateEnd)) ? (
                            <span className="text-red-500">
                              {' '}
                             Акция закончилась
                            </span>
                          ) : (
                            ` с ${reverseDate(
                              promotion.dateStart
                            )} по ${reverseDate(promotion.dateEnd)}`
                          )}
                        </div>
                      ) : (
                        <div className="mb-2 text-xs text-gray-500">
                          Промо нет
                        </div>
                      )}
                    </div>
                    <div className="mb-2 text-xs text-gray-500">
                      Описание:
                      {promotion.description ? (
                        <div
                          id="Description"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto resize-y"
                          style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }}
                          dangerouslySetInnerHTML={{
                            __html: promotion.description,
                          }}
                        ></div>
                      ) : (
                        <span className="text-gray-500">нет</span>
                      )}
                    </div>
                    <h3 className="mb-2 text-sm text-black-400">
                      {`Карусель: ${promotion.carousel ? 'Да' : 'Нет'}`}
                    </h3>
                  </div>
                  <button
                    className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
                    onClick={() => openEditModal(promotion)}
                  >
                    <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white rounded-b-lg">
                      Редактировать
                    </div>
                  </button>
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
