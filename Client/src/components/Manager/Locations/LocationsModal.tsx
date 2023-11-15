import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import deleteLocation from '../../../Redux/thunks/Locations/deleteLocation.api';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';

interface ILocation {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
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

  const modalTitle = isAddingMode ? 'Новая точка продажи' : 'Редактирование';

  const handleCancel = () => {
    setEditedLocation(undefined);
    onCloseEditModal();
  };

  const handleAdd = () => {
    if (editedLocation) {
      onSaveAdd(editedLocation);
      onCloseAddModal();
    }
  };

  const handleSave = () => {
    if (editedLocation) {
      onSaveEdit(editedLocation);
      onCloseEditModal();
    } else {
      alert('Заполните все поля перед сохранением.');
    }
  };

  // const handleFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isAddingMode) {
  //     onSaveAdd(editedLocation);
  //     onCloseAddModal();
  //   } else {
  //     onSaveEdit(editedLocation);
  //     onCloseEditModal();
  //   }
  // };

  //!!!!!
  const handleDelete = () => {
    if (editedLocation && editedLocation.id) {
      const locationId = editedLocation.id;
      dispatch(deleteLocation(locationId));
      onCloseEditModal();
    }
  };

  if (!isOpen || !editedLocation) {
    return null;
  }

  const inputFields: InputField[] = [
    {
      id: 'city',
      name: 'address',
      type: 'text',
      value: editedLocation.city,
      placeholder: '',
      autoComplete: 'off',
      title: 'Город',
      htmlFor: 'city',
      onChange: (value: string) =>
        setEditedLocation({
          ...editedLocation,
          city: value,
        }),
      required: true,
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
      onChange: (value: string) =>
        setEditedLocation({
          ...editedLocation,
          address: value,
        }),
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
      onChange: (value: string) => {
        setEditedLocation({
          ...editedLocation,
          hours: value,
        });
      },
      required: true,
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
