import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import LocationsModal from './LocationsModal';
import getLocations from '../../../Redux/thunks/Locations/getLocations.api';
import editLocation from '../../../Redux/thunks/Locations/editLocation.api';
import Sidebar from '../../Sidebar/Sidebar';
import Wrapper from '../../../ui/Wrapper';
import Button from '../../../ui/Button';

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

  const tableTitle = [
    { columnТame: '#' },
    { columnТame: 'Город' },
    { columnТame: 'Адрес' },
    { columnТame: 'Широта' },
    { columnТame: 'Долгота' },
    { columnТame: ' Рабочее время' },
  ];
  const columnsToShow = [
    'id',
    'city',
    'address',
    'latitude',
    'longitude',
    'hours',
  ];

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
          {/* то, что нужно вынести */}
          <div className="p-4">
            <h1 className="text-xl text-lime-600 font-medium mb-4">
              Список магазинов
            </h1>
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      {tableTitle.map((item, index) => (
                        <th
                          key={index + item.columnТame}
                          className="w-40 px-6 py-3 border-b-2 border-orange-300 text-left leading-4 text-slate-700 text-sm font-bold tracking-wider"
                        >
                          {item.columnТame}
                        </th>
                      ))}
                      <th className=" border-b-2 border-orange-300">
                        <Button
                          type="button"
                          onClick={openAddModal}
                          styleCSSSpan={
                            'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'
                          }
                          title="Добавить"
                        />
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody className="bg-white">
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
                          <div className="relative flex justify-center">
                            <Button
                              type="button"
                              onClick={() => openEditModal(location)}
                              styleCSSButton={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200`}
                              title="Редактировать"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}

                  {/* <tbody className="bg-white">
                    {displayedLocations.map((location, index) => (
                      <tr key={location.id}>
                        {columnsToShow.map((columnName) => (
                          <td
                            key={columnName}
                            className="px-6 py-4 whitespace-no-wrap border-b border-slate-400 text-slate-600 text-sm font-normal"
                          >
                            {columnName === 'id'
                              ? index + 1
                              : location[columnName]}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-slate-400">
                          <div className="relative flex justify-center">
                            <Button
                              type="button"
                              onClick={() => openEditModal(location)}
                              styleCSSButton={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200`}
                              title="Редактировать"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                  <tbody className="bg-white">
                    {displayedLocations.map((location, index) => (
                      <tr key={location.id}>
                        <td className="text-center border-b border-slate-400 text-slate-600 text-sm font-normal">
                          {index + 1}
                        </td>
                        {columnsToShow.slice(1).map((columnName) => (
                          <td
                            key={columnName}
                            className="px-6 py-4 whitespace-no-wrap border-b border-slate-400 text-slate-600 text-sm font-normal"
                          >
                            {location[columnName]}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-slate-400">
                          <div className="relative flex justify-center">
                            <Button
                              type="button"
                              onClick={() => openEditModal(location)}
                              styleCSSButton={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200`}
                              title="Редактировать"
                            />
                          </div>
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
