import React, { useEffect } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import deleteLocation from '../../Redux/thunks/Locations/deleteLocation.api';
import addLocation from '../../Redux/thunks/Locations/addLocation.api';

interface Location {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

interface LocationsModalProps {
  isOpen: boolean;
  location: Location | null;
  onSave: (editedLocation: Location) => void;
  onClose: () => void;
  isAddingMode: boolean;
  editedLocation: Location | null | undefined;
  setEditedLocation: React.Dispatch<
    React.SetStateAction<Location | null | undefined>
  >;
}

const LocationsModal: React.FC<LocationsModalProps> = ({
  isOpen,
  location,
  onSave,
  onClose,
  isAddingMode,
  editedLocation,
  setEditedLocation,
}) => {
  const dispatch = useAppDispatch();
  location || {
    id: 0,
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    hours: '',
  };

  useEffect(() => {
    if (location) {
      setEditedLocation({ ...location });
    }
  }, [location, isAddingMode, setEditedLocation]);

  const modalTitle = isAddingMode
    ? 'Добавить магазин'
    : 'Редактировать магазин';

  const handleCancel = () => {
    setEditedLocation(undefined);
    onClose();
  };

  const handleSave = () => {
    if (areFieldsValid() && editedLocation) {
      onSave(editedLocation);
      onClose();
    } else {
      alert('Заполните все поля перед сохранением.');
    }
  };

  const areFieldsValid = () => {
    if (editedLocation) {
      const { city, address, latitude, longitude, hours } = editedLocation;
      return city && address && latitude && longitude && hours;
    }
    return false;
  };
  const handleAdd = async () => {
    if (areFieldsValid() && editedLocation) {
      try {
        await dispatch(
          addLocation({
            newLocation: editedLocation,
          })
        );
        onClose();
      } catch (error) {
        console.error('Произошла ошибка при добавлении:', error);
      }
    } else {
      alert('Заполните все поля перед добавлением.');
    }
  };

  const handleDelete = () => {
    if (editedLocation && editedLocation.id) {
      const locationId = editedLocation.id;
      dispatch(deleteLocation(locationId));
      onClose();
    }
  };

  if (!isOpen || !editedLocation) {
    return null;
  }
  return (
    <div
      className="py-12 bg-gray-700 bg-opacity-70 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 rounded-lg"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div
          className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
          style={{ borderRadius: '30px' }}
        >
          <div className="w-full flex justify-start text-gray-600 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </div>
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            {modalTitle}
          </h1>
          <label
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            htmlFor="city"
          >
            Город
          </label>
          <input
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Город"
            value={editedLocation.city}
            onChange={(e) =>
              setEditedLocation({
                ...editedLocation,
                city: e.target.value,
              })
            }
            id="city"
          />
          <label
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            htmlFor="address"
          >
            Адрес
          </label>
          <div className="relative mb-5 mt-2">
            <input
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Адрес"
              value={editedLocation.address}
              onChange={(e) =>
                setEditedLocation({
                  ...editedLocation,
                  address: e.target.value,
                })
              }
              id="address"
            />
          </div>
          <label
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            htmlFor="latitude"
          >
            Широта
          </label>
          <div className="relative mb-5 mt-2">
            <input
              type="text"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Широта"
              value={editedLocation.latitude.toString().replace(',', '.')}
              onChange={(e) => {
                const value = e.target.value;
                const newValue = value.replace(/,/g, '.');
                // Проверка на пробелы
                if (
                  !newValue.includes(' ') &&
                  !isNaN(+newValue) &&
                  +newValue >= 0 &&
                  +newValue <= 90
                ) {
                  setEditedLocation({
                    ...editedLocation,
                    latitude: newValue,
                  });
                }
              }}
              id="latitude"
            />
          </div>

          <label
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            htmlFor="longitude"
          >
            Долгота
          </label>
          <div className="relative mb-5 mt-2">
            <input
              type="text"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Долгота"
              value={editedLocation.longitude.toString().replace(',', '.')}
              onChange={(e) => {
                const value = e.target.value;
                const newValue = value.replace(/,/g, '.');
                if (
                  !newValue.includes(' ') &&
                  !isNaN(+newValue) &&
                  +newValue >= 0 &&
                  +newValue <= 180
                ) {
                  setEditedLocation({
                    ...editedLocation,
                    longitude: newValue,
                  });
                }
              }}
              id="longitude"
            />
          </div>

          <label
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            htmlFor="hours"
          >
            Часы работы
          </label>
          <div className="relative mb-5 mt-2">
            <input
              id="hours"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Часы работы"
              value={editedLocation.hours}
              onChange={(e) =>
                setEditedLocation({
                  ...editedLocation,
                  hours: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center justify-start w-full">
            {isAddingMode ? (
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out hover:bg-green-600 bg-green-500 rounded text-white px-8 py-2 text-sm"
                onClick={handleAdd}
              >
                Добавить
              </button>
            ) : (
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out hover:bg-green-600 bg-green-500 rounded text-white px-8 py-2 text-sm"
                onClick={handleSave}
              >
                Сохранить
              </button>
            )}
            {location && !isAddingMode && (
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-3 bg-red-100 transition duration-150 text-red-600 ease-in-out hover:border-red-400 hover:bg-red-300 border rounded px-8 py-2 text-sm"
                onClick={handleDelete}
              >
                Удалить
              </button>
            )}
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={handleCancel}
            >
              Отменить
            </button>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={handleCancel}
            aria-label="close modal"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationsModal;
