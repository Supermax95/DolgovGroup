import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import deleteLocation from '../../../Redux/thunks/Locations/deleteLocation.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import PopUpNotification from '../../../ui/PopUpNotification';

interface ILocation {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
  invisible: boolean;
}

interface LocationsModalProps {
  isOpen: boolean;
  location: ILocation | null;
  onSaveAdd: (editedLocation: ILocation) => void;
  onSaveEdit: (editedLocation: ILocation) => void;
  onCloseAddModal: () => void;
  onCloseEditModal: () => void;
  isAddingMode: boolean;
  editedLocation: ILocation | null | undefined;
  setEditedLocation: React.Dispatch<
    React.SetStateAction<ILocation | null | undefined>
  >;
}

const LocationsModal: FC<LocationsModalProps> = ({
  isOpen,
  location,
  onSaveEdit,
  onSaveAdd,
  onCloseEditModal,
  onCloseAddModal,
  isAddingMode,
  editedLocation,
  setEditedLocation,
}) => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector<ILocation[]>(
    (state) => state.locationsSlice.data
  );
  const locationToSave = editedLocation || {
    id: 0,
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    hours: '',
    invisible: false,
  };

  //* удаление
  const [showNotificationDelLocation, setShowNotificationDelLocation] =
    useState<boolean>(false);

  useEffect(() => {
    if (location) {
      setEditedLocation({ ...location });
    }
  }, [location, isAddingMode, setEditedLocation]);

  useEffect(() => {
    if (showNotificationDelLocation) {
      const timeoutId = setTimeout(() => {
        setShowNotificationDelLocation(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [showNotificationDelLocation]);

  const modalTitle = isAddingMode ? 'Новая точка продажи' : 'Редактирование';

  const handleCancel = (): void => {
    setEditedLocation(undefined);
    onCloseEditModal();
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );
    if (isConfirmed) {
      if (isAddingMode) {
        onSaveAdd(locationToSave);
      } else {
        onSaveEdit(locationToSave);
      }
    }
  };

  const handleDelete = (): void => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить эту локацию?'
    );
    if (isConfirmed && editedLocation && editedLocation.id) {
      const locationId = editedLocation.id;

      try {
        dispatch(deleteLocation(locationId));
        setShowNotificationDelLocation(true);
        setTimeout(() => {
          onCloseEditModal();
        }, 50);
      } catch (error) {
        console.error('Произошла ошибка при отправке:', error);
      }
    }
  };

  if (!isOpen || !editedLocation) {
    return null;
  }
  const uniqueCities = [...new Set(locations.map((location) => location.city))];

  const inputFields: InputField[] = [
    {
      id: 'city',
      name: 'city',
      type: 'text',
      value: editedLocation.city,
      placeholder: '',
      autoComplete: 'off',
      title: 'Город',
      htmlFor: 'city',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedLocation({
            ...editedLocation,
            city: value,
          });
        }
      },
      required: true,
      options: [
        ...uniqueCities.map((city) => ({
          value: city,
          label: city,
        })),
      ],
    },
    {
      id: 'address',
      name: 'address',
      type: 'text',
      value: editedLocation.address,
      placeholder: '',
      autoComplete: 'off',
      title: 'Адрес',
      htmlFor: 'address',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedLocation({
            ...editedLocation,
            address: value,
          });
        }
      },
      required: true,
    },
    {
      id: 'latitude',
      name: 'latitude',
      type: 'text',
      value: editedLocation.latitude.toString().replace(',', '.'),
      placeholder: '',
      autoComplete: 'off',
      title: 'Широта',
      htmlFor: 'latitude',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
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
        }
      },
      required: true,
    },
    {
      id: 'longitude',
      name: 'longitude',
      type: 'text',
      value: editedLocation.longitude.toString().replace(',', '.'),
      placeholder: '',
      autoComplete: 'off',
      title: 'Долгота',
      htmlFor: 'longitude',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
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
        }
      },
      required: true,
    },
    {
      id: 'hours',
      name: 'hours',
      type: 'text',
      value: editedLocation.hours,
      placeholder: '',
      autoComplete: 'off',
      title: 'Часы работы',
      htmlFor: 'hours',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedLocation({
            ...editedLocation,
            hours: value,
          });
        }
      },
      required: true,
    },
    {
      id: 'invisible',
      name: 'invisible',
      type: 'boolean',
      value: editedLocation.invisible,
      title: 'Скрыть для покупателей',
      htmlFor: 'invisible',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'boolean') {
          setEditedLocation({
            ...editedLocation,
            invisible: value,
          });
        }
      },
    },
  ];

  return (
    <>
      {showNotificationDelLocation && (
        <PopUpNotification
          titleText={'Локация удалена'}
          name={`${editedLocation?.city} ${editedLocation?.address}`}
        />
      )}
      <form onSubmit={handleFormSubmit}>
        <Modal
          modalTitle={modalTitle}
          isAddingMode={isAddingMode}
          onCancelСlick={handleCancel}
          onDeleteClick={handleDelete}
        >
          <InputModal inputFields={inputFields} />
        </Modal>
      </form>
    </>
  );
};

export default LocationsModal;
