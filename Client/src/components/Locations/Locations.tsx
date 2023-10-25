import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import getLocations from '../../Redux/thunks/Locations/getLocations.api';
import editLocation from '../../Redux/thunks/Locations/editLocation.api';

interface Location {
  id: number;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: string;
}

const Locations: React.FC = () => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector<Location[]>((state) => state.locationsSlice.data);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const openEditModal = (location: Location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedLocation(null);
    setModalOpen(false);
  };

  const handleSave = async (editedLocation: Location) => {
    try {
      if (selectedLocation) {
        await dispatch(editLocation({ locationId: selectedLocation.id, newInfo: editedLocation }));
        closeEditModal();
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список магазинов</h1>
      <ul className="space-y-4">
        {locations.map((location) => (
          <li key={location.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">Город: {location.city}</h2>
            <p className="text-gray-600">Адрес: {location.address}</p>
            <p className="text-gray-600">
              Широта: {location.latitude}, Долгота: {location.longitude}
            </p>
            <p className="text-gray-600">Рабочее время: {location.hours}</p>
            <button
              onClick={() => openEditModal(location)}
              className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Редактировать
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedLocation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
          <div className="bg-white p-4 z-10">
            <h2 className="text-xl font-semibold">Редактировать местоположение</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Город:
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded border border-gray-400 focus-outline-none focus-border-blue-500 text-gray-700 py-2 px-4"
                  value={selectedLocation.city}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      city: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Адрес:
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded border border-gray-400 focus-outline-none focus-border-blue-500 text-gray-700 py-2 px-4"
                  value={selectedLocation.address}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Широта:
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-100 rounded border border-gray-400 focus-outline-none focus-border-blue-500 text-gray-700 py-2 px-4"
                  value={selectedLocation.latitude}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      latitude: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Долгота:
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-100 rounded border border-gray-400 focus-outline-none focus-border-blue-500 text-gray-700 py-2 px-4"
                  value={selectedLocation.longitude}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      longitude: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Рабочее время:
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded border border-gray-400 focus-outline-none focus-border-blue-500 text-gray-700 py-2 px-4"
                  value={selectedLocation.hours}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      hours: e.target.value,
                    })
                  }
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(selectedLocation)}
                  className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;
