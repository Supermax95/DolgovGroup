import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import LocationsModal from './LocationsModal';
import getLocations from '../../../Redux/thunks/Locations/getLocations.api';
import editLocation from '../../../Redux/thunks/Locations/editLocation.api';
import Sidebar from '../../Sidebar/Sidebar';
import Wrapper from '../../../ui/Wrapper';

interface Location {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

const Location: React.FC = () => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector<Location[]>(
    (state) => state.locationsSlice.data
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedLocation, setEditedLocation] = useState<
    Location | null | undefined
  >(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredLocations = selectedCity
    ? locations.filter((location) => location.city === selectedCity)
    : locations;

  const displayedLocations = filteredLocations.slice(startIndex, endIndex);

  const openEditModal = (location: Location) => {
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

  const handleSave = async (editedLocation: Location) => {
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
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Извлекаем уникальные города
  const uniqueCities = [...new Set(locations.map((location) => location.city))];

  return (
    <Wrapper>
      <div className="p-4">
        <div className="flex">
          <Sidebar
            menuItems={uniqueCities}
            onMenuItemClick={setSelectedCity}
            title="Города"
            // currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Список магазинов</h1>
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                        Город
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                        Адрес
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                        Широта
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                        Долгота
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                        Рабочее время
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300">
                        <button
                          onClick={openAddModal}
                          className="py-2 px-10 rounded bg-green-500 text-white"
                        >
                          Добавить
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {displayedLocations.map((location, index) => (
                      <tr key={location.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <h2 className="text-xl font-semibold">
                            {location.city}
                          </h2>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <p className="text-gray-600">{location.address}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <p className="text-gray-600">{location.latitude}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <p className="text-gray-600">{location.longitude}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <p className="text-gray-600"> {location.hours}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500">
                          <button
                            onClick={() => openEditModal(location)}
                            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                          >
                            Редактировать
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              {pageNumbers.map((page) => (
                <button
                  key={page}

                  onClick={() => setCurrentPage(page)}

                  className={`px-3 py-2 rounded ${
                    page === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-500 hover-bg-blue-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

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
        </div>
      </div>
    </Wrapper>
  );
};

export default Location;
