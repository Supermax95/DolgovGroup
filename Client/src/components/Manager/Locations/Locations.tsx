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

export interface ILocation {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
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
  | 'hours';

const Location: FC = () => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector<ILocation[]>(
    (state) => state.locationsSlice.data
  );

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
  ];

  const columnsListDb: IColumnsListDb[] = [
    'id',
    'city',
    'address',
    'latitude',
    'longitude',
    'hours',
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

    const filterLocations = () => {
      let filtered = filteredLocations;
        
      if (searchText !== '') {
        filtered = filtered.filter((location) => {
          const locationFields = [
            String(location.city),
            String(location.address),
            String(location.latitude),
            String(location.longitude),
            String(location.hours)
          ];
        
          const searchTerms = searchText.toLowerCase().split(' ');
        
          return searchTerms.every((term) =>
            locationFields.some((field) =>field.toLowerCase().includes(term)
            )
          );
        });
      }
        
      return filtered;
    };
    

  const displayedLocations = filterLocations().slice(startIndex, endIndex);

  const openEditModal = (location: ILocation) => {
    setSelectedLocation(location);
    setEditedLocation({ ...location });
    setAddingMode(false);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setAddingMode(true);
    setEditedLocation({
      id: 0,
      city: '',
      address: '',
      latitude: '',
      longitude: '',
      hours: '',
    });
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedLocation(null);
    setEditedLocation(null);
    setModalOpen(false);
  };

  const handleSave = async (editedLocation: ILocation) => {
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

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  // Извлекаем уникальные города
  const uniqueCities = [...new Set(locations.map((location) => location.city))];

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
            onSave={handleSave}
            onClose={closeEditModal}
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
