import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import addLocation from '../../../Redux/thunks/Locations/addLocation.api';
import deleteLocation from '../../../Redux/thunks/Locations/deleteLocation.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';

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
    ? 'Новая точка продажи'
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

  const inputFields: InputField[] = [
    {
      id: 'city',
      type: 'text',
      value: editedLocation.city,
      placeholder: '',
      autoCapitalize: 'word',
      autoComplete: 'off',
      title: 'Город',
      htmlFor: 'city',
      onChange: (value: string) =>
        setEditedLocation({
          ...editedLocation,
          city: value,
        }),
    },
    {
      id: 'address',
      type: 'text',
      value: editedLocation.address,
      placeholder: '',
      autoCapitalize: 'word',
      autoComplete: 'off',
      title: 'Адрес',
      htmlFor: 'address',
      onChange: (value: string) =>
        setEditedLocation({
          ...editedLocation,
          address: value,
        }),
    },
    {
      id: 'latitude',
      type: 'text',
      value: editedLocation.latitude.toString().replace(',', '.'),
      placeholder: '',
      autoComplete: 'off',
      title: 'Широта',
      htmlFor: 'latitude',
      onChange: (value: string) => {
        const newValue = value.replace(/,/g, '.');
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
      },
    },
    {
      id: 'longitude',
      type: 'text',
      value: editedLocation.longitude.toString().replace(',', '.'),
      placeholder: '',
      autoComplete: 'off',
      title: 'Долгота',
      htmlFor: 'longitude',
      onChange: (value: string) => {
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
      },
    },
    {
      id: 'hours',
      type: 'text',
      value: editedLocation.hours,
      placeholder: '',
      autoComplete: 'off',
      title: 'Часы работы',
      htmlFor: 'hours',
      onChange: (value: string) => {
        setEditedLocation({
          ...editedLocation,
          hours: value,
        });
      },
    },
  ];

  return (
    <Wrapper>
      <Modal
        modalTitle={modalTitle}
        isAddingMode={isAddingMode}
        onAddClick={handleAdd}
        onSaveClick={handleSave}
        onDeleteClick={handleDelete}
        onCancellick={handleCancel}
      >
        <InputModal inputFields={inputFields} />
      </Modal>
    </Wrapper>
  );
};

export default LocationsModal;
