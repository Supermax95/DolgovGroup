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
    dispatch(getLocations());
  }, [dispatch]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredLocations = selectedCity
    ? locations.filter((location) => location.city === selectedCity)
    : locations;

  // const filterLocations = () => {
  //   let filtered = filteredLocations;

  //   if (searchText !== '') {
  //     filtered = filtered.filter((location) => {
  //       const locationFields = [
  //         String(location.city),
  //         String(location.address),
  //         String(location.latitude),
  //         String(location.longitude),
  //         String(location.hours),
  //       ];

  //       const searchTerms = searchText.toLowerCase().split(' ');

  //       return searchTerms.every((term) =>
  //         locationFields.some((field) => field.toLowerCase().includes(term))
  //       );
  //     });
  //   }

  //   return filtered;
  // };

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

  const displayedLocations = filterLocations().slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

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
  };

  const closeEditModal = (): void => {
    setSelectedLocation(null);
    setEditedLocation(null);
    setModalOpen(false);
  };

  const handleSaveAdd = async (): Promise<void> => {
    try {
      if (editedLocation) {
        await dispatch(
          addLocation({
            newLocation: editedLocation,
          })
        );
        closeAddModal();
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
    }
  };

  const handleSaveEdit = async (editedLocation: ILocation): Promise<void> => {
    try {
      if (selectedLocation) {
        await dispatch(
          editLocation({
            locationId: selectedLocation.id,
            newInfo: editedLocation,
          })
        );
        closeEditModal();
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
    }
  };

  return (
    <Wrapper>
      <Sidebar
        items={uniqueCities}
        onItemSelect={setSelectedCity}
        title="Города"
        setCurrentPage={setCurrentPage}
        displayKey={(city) => city}
      />
      <div className="p-4">
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
        </div>

        <Table
          title="Список магазинов"
          childrenSearch={<Search onFilter={setSearchText} />}
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
      </div>
    </Wrapper>
  );
};

export default Location;

// return (
//   <Wrapper>
//     <Sidebar
//       items={uniqueCities}
//       onItemSelect={setSelectedCity}
//       title="Города"
//       setCurrentPage={setCurrentPage}
//       displayKey={(city) => city}
//     />
//     <div className="p-4">
//         {/* Инпут для поиска */}
//         <div className="mb-3">
//         <Search onFilter={setSearchText} />
//       </div>

//       {/* Радиокнопки под инпутом для поиска */}
//       <div className="mt-3">
//         <label>
//           <input
//             type="radio"
//             value="visible"
//             checked={selectedVisibility === 'visible'}
//             onChange={() => setSelectedVisibility('visible')}
//           />
//           Видимые для покупателей
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="invisible"
//             checked={selectedVisibility === 'invisible'}
//             onChange={() => setSelectedVisibility('invisible')}
//           />
//           Скрытые от покупателей
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="all"
//             checked={selectedVisibility === 'all'}
//             onChange={() => setSelectedVisibility('all')}
//           />
//           Сброс фильтра
//         </label>
//       </div>
//       <div className="mb-3">
//         <Table
//           title="Список магазинов"
//           // childrenSearch={<Search onFilter={setSearchText} />}
//           columnsDefaultName={columnsDefaultName}
//           data={displayedLocations}
//           currentPage={currentPage}
//           itemsPerPage={itemsPerPage}
//           columnsListDb={columnsListDb}
//           onAddClick={openAddModal}
//           onEditClick={openEditModal}
//         />
//       </div>

//       {/* Используем компонент Pagination */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />

//       {isModalOpen && (selectedLocation || isAddingMode) && (
//         <LocationsModal
//           isOpen={isModalOpen}
//           location={selectedLocation}
//           onSaveEdit={handleSaveEdit}
//           onSaveAdd={handleSaveAdd}
//           onCloseAddModal={closeAddModal}
//           onCloseEditModal={closeEditModal}
//           isAddingMode={isAddingMode}
//           editedLocation={editedLocation}
//           setEditedLocation={setEditedLocation}
//         />
//       )}
//     </div>
//   </Wrapper>
// );
// };
