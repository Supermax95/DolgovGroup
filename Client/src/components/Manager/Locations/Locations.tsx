import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import LocationsModal from './LocationsModal';
import getLocations from '../../../Redux/thunks/Locations/getLocations.api';
import editLocation from '../../../Redux/thunks/Locations/editLocation.api';
import Wrapper from '../../../ui/Wrapper';
import Sidebar from '../../../ui/Sidebar';
import Pagination from '../../../ui/Paggination';
import Table from '../../../ui/Table';
import Search from '../../../ui/Search';
import addLocation from '../../../Redux/thunks/Locations/addLocation.api';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import { unwrapResult } from '@reduxjs/toolkit';

export interface ILocation {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
  invisible: boolean;
}

interface IColumnsDefaultName {
  name: string;
}

type IColumnsListDb =
  | 'id'
  | 'city'
  | 'address'
  | 'latitude'
  | 'longitude'
  | 'hours'
  | 'invisible';

const Location: FC = () => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector<ILocation[]>(
    (state) => state.locationsSlice.data
  );
  const [selectedVisibility, setSelectedVisibility] = useState<
    'all' | 'visible' | 'invisible'
  >('all');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedLocation, setEditedLocation] = useState<
    ILocation | null | undefined
  >(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(true);

  //* всплывающие уведомления
  const [showNotificationAddLocation, setShowNotificationAddLocation] =
    useState<boolean>(false);
  const [showNotificationEditLocation, setShowNotificationEditLocation] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [
    showErrorNotificationAddLocation,
    setShowErrorNotificationAddLocation,
  ] = useState<boolean>(false);
  const [
    showErrorNotificationEditLocation,
    setShowErrorNotificationEditLocation,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (
      showNotificationAddLocation ||
      showErrorNotificationAddLocation ||
      showNotificationEditLocation ||
      showErrorNotificationEditLocation
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAddLocation(false);
        setShowErrorNotificationAddLocation(false);
        setShowNotificationEditLocation(false);
        setShowErrorNotificationEditLocation(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationAddLocation,
    showErrorNotificationAddLocation,
    showNotificationEditLocation,
    showErrorNotificationEditLocation,
  ]);

  const columnsDefaultName: IColumnsDefaultName[] = [
    { name: 'Город' },
    { name: 'Адрес' },
    { name: 'Широта' },
    { name: 'Долгота' },
    { name: 'Часы работы' },
    { name: 'Видимость для покупателей' },
  ];

  const columnsListDb: IColumnsListDb[] = [
    'id',
    'city',
    'address',
    'latitude',
    'longitude',
    'hours',
    'invisible',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getLocations());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredLocations = selectedCity
    ? locations.filter((location) => location.city === selectedCity)
    : locations;

  const filterLocations = () => {
    let filtered = filteredLocations;

    // Фильтрация по видимости
    if (selectedVisibility !== 'all') {
      filtered = filtered.filter(
        (location) =>
          location.invisible === (selectedVisibility === 'invisible')
      );
    }

    if (searchText !== '') {
      filtered = filtered.filter((location) => {
        const locationFields = [
          String(location.city),
          String(location.address),
          String(location.latitude),
          String(location.longitude),
          String(location.hours),
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        return searchTerms.every((term) =>
          locationFields.some((field) => field.toLowerCase().includes(term))
        );
      });
    }

    return filtered;
  };

  const filteredLocationsPag = filterLocations();

  const totalMatches = filteredLocationsPag.length;
  const totalPages = Math.ceil(totalMatches / itemsPerPage);
  const displayedLocations = filterLocations().slice(startIndex, endIndex);

  // Извлекаем уникальные города
  const uniqueCities = [...new Set(locations.map((location) => location.city))];

  const openAddModal = (): void => {
    setAddingMode(true);
    setEditedLocation({
      id: 0,
      city: '',
      address: '',
      latitude: '',
      longitude: '',
      hours: '',
      invisible: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (location: ILocation): void => {
    setSelectedLocation(location);
    setEditedLocation({ ...location });
    setAddingMode(false);
    setModalOpen(true);
  };

  const closeAddModal = (): void => {
    setSelectedLocation(null);
    setEditedLocation(null);
    setModalOpen(false);
    dispatch(getLocations());
  };

  const closeEditModal = (): void => {
    setSelectedLocation(null);
    setEditedLocation(null);
    setModalOpen(false);
    dispatch(getLocations());
  };

  const handleSaveAdd = async (): Promise<void> => {
    try {
      if (editedLocation) {
        const resultAction = await dispatch(
          addLocation({
            newLocation: editedLocation,
          })
        );

        unwrapResult(resultAction);
        setShowNotificationAddLocation(true);
        setTimeout(() => {
          closeEditModal();
        }, 50);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddLocation(true);
    }
  };

  const handleSaveEdit = async (editedLocation: ILocation): Promise<void> => {
    try {
      if (selectedLocation) {
        const resultAction = await dispatch(
          editLocation({
            locationId: selectedLocation.id,
            newInfo: editedLocation,
          })
        );
        unwrapResult(resultAction);
        setErrorNotification(null);
        setShowNotificationEditLocation(true);
      }
      setTimeout(() => {
        closeEditModal();
      }, 50);
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationEditLocation(true);
    }
  };

  const filterRadio = (
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
  );

  return (
    <Wrapper>
      {showNotificationAddLocation && (
        <PopUpNotification
          titleText={'Добавлена новая локация'}
          name={`${editedLocation?.city} ${editedLocation?.address}`}
        />
      )}
      {showNotificationEditLocation && (
        <PopUpNotification
          titleText={'Внесены изменения в локацию'}
          name={`${editedLocation?.city} ${editedLocation?.address}`}
        />
      )}
      {/* //!уведомления об ошибках */}
      {showErrorNotificationAddLocation && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationEditLocation && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="relative h-16 w-16">
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-4 border-gray-300 rounded-full animate-spin"></div>
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-t-4 border-green-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <Sidebar
            items={uniqueCities}
            onItemSelect={setSelectedCity}
            title="Города"
            setCurrentPage={setCurrentPage}
            displayKey={(city) => city}
          />
          <div className="p-4">
            <Table
              // title="Список магазинов"
              childrenSearch={<Search onFilter={setSearchText} />}
              childrenFilter={filterRadio}
              columnsDefaultName={columnsDefaultName}
              data={displayedLocations}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              columnsListDb={columnsListDb}
              onAddClick={openAddModal}
              onEditClick={openEditModal}
            />
            {/* Используем компонент Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {isModalOpen && (selectedLocation || isAddingMode) && (
            <LocationsModal
              isOpen={isModalOpen}
              location={selectedLocation}
              onSaveEdit={handleSaveEdit}
              onSaveAdd={handleSaveAdd}
              onCloseAddModal={closeAddModal}
              onCloseEditModal={closeEditModal}
              isAddingMode={isAddingMode}
              editedLocation={editedLocation}
              setEditedLocation={setEditedLocation}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Location;
