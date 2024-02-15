import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks';
import {
  Cog8ToothIcon,
  PencilIcon,
  PlusCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationCircleIcon,
  PhotoIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';
import addCategory from '../../../../Redux/thunks/Category/addCategory.api';
import deleteCategory from '../../../../Redux/thunks/Category/deleteCategory.api';
import editCategory from '../../../../Redux/thunks/Category/editCategory.api';
import addSubcategory from '../../../../Redux/thunks/SubCategory/addSubcategory.api';
import editSubcategory from '../../../../Redux/thunks/SubCategory/editSubcategory.api';
import deleteSubcategory from '../../../../Redux/thunks/SubCategory/deleteSubcategory.api';
import { XMarkIcon } from '@heroicons/react/20/solid';
import PopUpNotification from '../../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../../ui/PopUpErrorNotification';
import { unwrapResult } from '@reduxjs/toolkit';
import { Tooltip } from 'flowbite-react';
import { VITE_URL } from '../../../../VITE_URL';
import axios from 'axios';
import getCategory from '../../../../Redux/thunks/Category/getCategory.api';
import deleteCategoryPhoto from '../../../../Redux/thunks/Category/deleteCategoryPhoto.api';

interface ICategory {
  //Продукты.tsx ругаются на эти вопросы
  id?: number;
  categoryName?: string;
  img?: string;
}

interface ISubcategory {
  id: number;
  categoryId: number;
  subcategoryName: string;
}

interface ProductSidebarProps {
  categories: ICategory[];
  addModal: () => void | undefined;
  onCategorySelect: (category: ICategory | null) => void;
  onSubcategorySelect: (subcategory: ISubcategory | null) => void;
  onActiveCategory: (category: ICategory | null) => void;
  onActiveSubcategory: (subcategory: ISubcategory | null) => void;
  resetFirstComponentState: () => void | undefined;
}

const ProductSidebar: FC<ProductSidebarProps> = ({
  categories,
  addModal,
  onCategorySelect,
  onSubcategorySelect,
  onActiveCategory,
  onActiveSubcategory,
  resetFirstComponentState,
}) => {
  const dispatch = useAppDispatch();

  const allCategories = useAppSelector<ICategory[]>(
    (state) => state.categorySlice.data
  );

  const allSubcategories = useAppSelector(
    (state) => state.subcategorySlice.data
  );

  //* добавление категории
  const [isAddingCategory, setAddingCategory] = useState<boolean>(false);
  const [dataCategory, setDataCategory] = useState<string>('');
  // ? редактирование категории
  const [isEditingCategory, setEditingCategory] = useState<number | null>(null);
  const [dataEditCategory, setDataEditCategory] = useState<ICategory | null>(
    null
  );
  const [titleNotification, setTitleNotification] = useState<string>('');

  //* добавление подкатегории
  const [isAddingSubcategory, setAddingSubcategory] = useState<boolean>(false);
  const [dataSubcategory, setDataSubcategory] = useState<string>('');
  const [
    selectedCategoryIdForSubcategory,
    setSelectedCategoryIdForSubcategory,
  ] = useState<number | null>(null); // отслеживает ID текущей выбранной категории для добавления подкатегории
  // ? редактирование подкатегории
  const [isEditingSubcategory, setEditingSubcategory] = useState<number | null>(
    null
  );
  const [dataEditSubcategory, setDataEditSubcategory] =
    useState<ISubcategory | null>(null);
  //? выводит подкатегории в сайдбаре
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState<
    ISubcategory[] | null
  >(null);

  //* рендерит  выпадающий список для категорий
  const [selectedCategoryDataId, setSelectedCategoryDataId] =
    useState<number>(0);
  //* рендерит  выпадающий список для ПОДкатегорий
  const [selectedSubcategoryDataId, setSelectedSubcategoryDataId] =
    useState<number>(0);

  //! вывод подкатегории в сайдбаре - запоминает id и булевое - открыто/закрыто
  const [subcategoryStates, setSubcategoryStates] = useState<{
    [key: number]: boolean;
  }>({});

  const [actionMenuForCategory, setActionMenuForCategory] =
    useState<boolean>(false); //* меню для редактирования категории
  const [actionMenuForSub, setActionMenuForSub] = useState<boolean>(false); //* меню для редактирования подкатегории

  const [menuPosition, setMenuPosition] = useState(0);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuClass = actionMenuForCategory ? 'block' : 'hidden';
  const menuClassSub = actionMenuForSub ? 'block' : 'hidden';

  //* всплывающие уведомления
  // ? категории
  const [showNotificationAddCategory, setShowNotificationAddCategory] =
    useState<boolean>(false);
  const [showNotificationEditCategory, setShowNotificationEditCategory] =
    useState<boolean>(false);

  // ? ПОДкатегории
  const [showNotificationAddSubcategory, setShowNotificationAddSubcategory] =
    useState<boolean>(false);
  const [showNotificationEditSubcategory, setShowNotificationEditSubcategory] =
    useState<boolean>(false);

  //!  надо ли разделить эрро на категорию и подкатегорию
  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );
  // ? об ошибке категории
  const [
    showErrorNotificationAddCategory,
    setShowErrorNotificationAddCategory,
  ] = useState<boolean>(false);
  const [
    showErrorNotificationEditCategory,
    setShowErrorNotificationEditCategory,
  ] = useState<boolean>(false);
  // ? ПОДкатегории
  const [
    showErrorNotificationAddSubcategory,
    setShowErrorNotificationAddSubcategory,
  ] = useState<boolean>(false);
  const [
    showErrorNotificationEditSubcategory,
    setShowErrorNotificationEditSubcategory,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (
      showNotificationAddCategory ||
      showErrorNotificationAddCategory ||
      showNotificationEditCategory ||
      showErrorNotificationEditCategory ||
      showNotificationAddSubcategory ||
      showNotificationEditSubcategory ||
      showErrorNotificationAddSubcategory ||
      showErrorNotificationEditSubcategory
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAddCategory(false);
        setShowErrorNotificationAddCategory(false);
        setShowNotificationEditCategory(false);
        setShowErrorNotificationEditCategory(false);
        setShowNotificationAddSubcategory(false);
        setShowErrorNotificationAddSubcategory(false);
        setShowNotificationEditSubcategory(false);
        setShowErrorNotificationEditSubcategory(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationAddCategory,
    showErrorNotificationAddCategory,
    showNotificationEditCategory,
    showErrorNotificationEditCategory,
    showNotificationAddSubcategory,
    showNotificationEditSubcategory,
    showErrorNotificationAddSubcategory,
    showErrorNotificationEditSubcategory,
  ]);

  // показывает все продукты
  const handleAll = () => {
    onCategorySelect(null);
    onSubcategorySelect(null);
    onActiveCategory(null);
    onActiveSubcategory(null);
    resetFirstComponentState();
  };

  //* всплывающее меню для каждой КАТЕГОРИИ
  const toggleMenuCategory = (e: React.MouseEvent, id: number): void => {
    e.stopPropagation(); // Это предотвратит всплытие события и отменит срабатывание обработчика событий на родительском элементе
    setActionMenuForCategory(!actionMenuForCategory);
    setSelectedSubcategoryDataId(null);
    setSelectedCategoryDataId(id);
    calculateMenuPosition(e);
  };

  const cancelToggleMenuCategory = (): void => {
    setActionMenuForCategory(false);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setActionMenuForCategory(false);
      setActionMenuForSub(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const calculateMenuPosition = (e: React.MouseEvent): void => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const newTop = rect.bottom + scrollTop - 130;
    setMenuPosition(newTop);
  };

  //* всплывающее меню для каждой ПОДкатегории
  const toggleMenuSub = (e: React.MouseEvent, id: number): void => {
    e.stopPropagation(); // Это предотвратит всплытие события и отменит срабатывание обработчика событий на родительском элементе
    setActionMenuForSub(!actionMenuForSub);
    setSelectedCategoryDataId(null);
    setSelectedSubcategoryDataId(id);
    calculateMenuPosition(e);
  };

  const cancelToggleMenuSub = (): void => {
    setActionMenuForSub(false);
  };

  // ? логика добавления категории
  const startAddingCategory = (): void => {
    setAddingCategory(true);
  };

  const cancelAddingCategory = (): void => {
    setAddingCategory(false);
    // setDataCategory('');
  };
  //Загрузка изображения категории

  const uploadCategoryFile = async (
    file: File,
    id: number | 0
  ): Promise<void> => {
    if (file && id) {
      const formData = new FormData();
      formData.append('file', file);
      console.log('==========>uploadCategoryFile', id);

      try {
        await axios.put(`${VITE_URL}/categoryImg/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
      }
    }
  };

  const handleFileInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ): Promise<void> => {
    try {
      console.log('===========>Sidebar-handleFileInputChange');

      const file = e.target.files?.[0] || null;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await uploadCategoryFile(file, id);
      await dispatch(getCategory());
      setActionMenuForCategory(false);
      setActionMenuForSub(false);
    } catch (error) {
      console.error('Error in handleFileInputChange:', error);
    }
  };
  const handleDeletePhoto = (id: number) => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить изображение?'
    );

    if (isConfirmed && id) {
      const categoryId = id;

      try {
        dispatch(deleteCategoryPhoto(categoryId));
        // setShowNotificationDelPick(true);
        setActionMenuForCategory(false);
        setActionMenuForSub(false);
      } catch (error) {
        console.error('Произошла ошибка при удалении:', error);
      }
      // setTimeout(() => {
      //   onCloseEditModal();
      // }, 50);
    }
  };

  const addedHandleForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (addCategory) {
        const resultAdd = await dispatch(
          addCategory({
            newCategory: dataCategory,
          })
        );
        unwrapResult(resultAdd);
        setAddingCategory(false);
        setDataCategory('');
        setErrorNotification(null);
        setShowNotificationAddCategory(true);
        setTitleNotification(dataCategory.categoryName);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddCategory(true);
    }
  };

  // ? логика редактирования категории
  const startEditingCategory = (id: number): void => {
    setEditingCategory(id);
    const categoryToEdit = allCategories.find((cat) => cat.id === id);
    setActionMenuForCategory(false);
    setDataEditCategory(categoryToEdit || null);
  };

  const stopEditing = (): void => {
    setEditingCategory(null);
    setDataEditCategory(null);
  };

  // раскрывает предыдущее и записывает текущее состояние
  const handleFieldChange = (fild: keyof ICategory, value: string): void => {
    setDataEditCategory((prev) => ({
      ...prev,
      [fild]: value,
    }));
  };

  const editedCategoryHandleForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения в категорию?'
    );

    if (isConfirmed) {
      try {
        if (editCategory) {
          const resultEdit = await dispatch(
            editCategory({
              categoryId: dataEditCategory.id,
              newCategoryName: dataEditCategory?.categoryName,
            })
          );
          unwrapResult(resultEdit);
          setEditingCategory(null);
          setErrorNotification(null);
          setShowNotificationEditCategory(true);
          setTitleNotification(dataEditCategory.categoryName);
        }
      } catch (error) {
        console.error('Произошла ошибка при добавлении:', error);
        setErrorNotification(error as string | null);
        setShowErrorNotificationEditCategory(true);
      }
    }
  };

  // ? удаление категории
  const deleteCategoryHandler = (id: number): void => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить категорию? Продукты будут удалены из категории автоматически.'
    );

    if (isConfirmed) {
      dispatch(deleteCategory(id));
      setActionMenuForCategory(false);
      setActionMenuForSub(false);
    } else {
      setActionMenuForCategory(true);
    }
  };

  // ? вывод подкатегорий в сайдбаре и их скрытие
  const subcategoryOutput = (id: number, adding = false): void => {
    const subcategory = allSubcategories.filter(
      (sub: ISubcategory) => sub.categoryId === id
    );
    setSelectedSubcategoryData(subcategory);

    if (adding) {
      setSubcategoryStates((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setSubcategoryStates((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    }
  };

  // //* вывод подкатегорий для добавлении подкатегории
  // const OpenCategorynAddingSubcategory = (id: number): void => {
  //   const subcategory = allSubcategories.filter(
  //     (sub: ISubcategory) => sub.categoryId === id
  //   );
  //   setSelectedSubcategoryData(subcategory);
  //   setSubcategoryStates((prevState) => ({
  //     ...prevState,
  //     [id]: true, // Всегда устанавливаем в true, чтобы список всегда открывался
  //   }));
  // };

  // ? логика добавления ПОДкатегории
  const startAddingSubcategory = (id: number): void => {
    setSelectedCategoryIdForSubcategory(id);
    setAddingSubcategory(true);
    setActionMenuForCategory(false);
  };

  const cancelAddingSubcategory = (): void => {
    setAddingSubcategory(false);
    setDataSubcategory('');
  };

  const addedHandleFormSubcategory = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (addSubcategory) {
        const resultAdd = await dispatch(
          addSubcategory({
            newSubcategory: dataSubcategory.subcategoryName,
            categoryId: selectedCategoryIdForSubcategory,
          })
        );
        unwrapResult(resultAdd);
        setAddingSubcategory(false);
        setDataSubcategory('');
        setErrorNotification(null);
        setShowNotificationAddSubcategory(true);
        //* при лобавлении подкатегории открывается тут же список в категории
        subcategoryOutput(selectedCategoryIdForSubcategory, true);
        setTitleNotification(dataSubcategory.subcategoryName);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddSubcategory(true);
    }
  };

  // ? логика редактирования ПОДкатегории
  const startEditingSubcategory = (id: number): void => {
    setEditingSubcategory(id);
    const subcategoryToEdit = allSubcategories.find((sub) => sub.id === id);

    setActionMenuForSub(false);
    setDataEditSubcategory(subcategoryToEdit || null);
  };

  const stopEditingSubcategory = (): void => {
    setEditingSubcategory(null);
    setDataEditSubcategory(null);
  };

  // раскрывает предыдущее и записывает текущее состояние
  const handleFieldChangeSubcategory = (
    fild: keyof ISubcategory,
    value: string
  ): void => {
    setDataEditSubcategory((prev) => ({
      ...prev,
      [fild]: value,
    }));
  };

  const editedSubcategoryHandleForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения в подкатегорию?'
    );

    if (isConfirmed) {
      try {
        if (editSubcategory) {
          const resultEdit = await dispatch(
            editSubcategory({
              subcategoryId: dataEditSubcategory.id,
              newSubcategoryName: dataEditSubcategory?.subcategoryName,
            })
          );
          unwrapResult(resultEdit);
          setEditingSubcategory(null);
          setErrorNotification(null);
          setShowNotificationEditSubcategory(true);
          setTitleNotification(dataEditSubcategory.subcategoryName);
        }
      } catch (error) {
        console.error('Произошла ошибка при добавлении:', error);
        setErrorNotification(error as string | null);
        setShowErrorNotificationEditSubcategory(true);
      }
    }
  };

  // ? удаление ПОДкатегории
  const deleteSubcategoryHandler = (id: number): void => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить подкатегорию? Продукты будут удалены из подкатегории автоматически.'
    );

    if (isConfirmed) {
      dispatch(deleteSubcategory(id));
      setActionMenuForCategory(false);
      setActionMenuForSub(false);
    } else {
      setActionMenuForSub(true);
    }
  };

  /** Рендер карточек на странице */
  //! рендерит карточки категорий
  const handleCategoryClick = (selectedCategoryId: number): void => {
    const currentCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );

    onCategorySelect(currentCategory || null);
    onActiveCategory(currentCategory || null);
    onSubcategorySelect(null); // Сбрасываем выбранную подкатегорию
    onActiveSubcategory(null); // Сбрасываем активную подкатегорию
  };

  //! рендерит карточки подкатегорий
  const handleSubcategoryClick = (selectedSubcategory: number): void => {
    const currentSubcategory = allSubcategories.find(
      (sub) => sub.id === selectedSubcategory
    );

    // Находим соответствующую категорию
    const currentCategory = categories.find(
      (category) => category.id === currentSubcategory?.categoryId
    );

    // Добавляем вызов onCategorySelect, чтобы передать выбранную категорию наружу
    onCategorySelect(currentCategory || null);
    onActiveCategory(currentCategory || null);

    // Добавляем вызов onSubcategorySelect, чтобы передать выбранную подкатегорию наружу
    onSubcategorySelect(currentSubcategory || null);
    onActiveSubcategory(currentSubcategory || null);
  };

  return (
    <>
      {showNotificationAddCategory && (
        <PopUpNotification
          titleText={'Добавлена новая категория'}
          name={titleNotification}
        />
      )}
      {showNotificationEditCategory && (
        <PopUpNotification
          titleText={'Категория переименова'}
          name={titleNotification}
        />
      )}

      {showNotificationAddSubcategory && (
        <PopUpNotification
          titleText={'Добавлена новая подкатегория'}
          name={titleNotification}
        />
      )}
      {showNotificationEditSubcategory && (
        <PopUpNotification
          titleText={'Внесены изменения в подкатегорию'}
          name={titleNotification}
        />
      )}

      {/* //!уведомления об ошибках */}
      {showErrorNotificationAddCategory && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationEditCategory && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}

      {showErrorNotificationAddSubcategory && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationEditSubcategory && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      <div className="flex flex-col w-64 bg-white h-full border-r-2 border-orange-300">
        <div className="h-16 flex items-center justify-center border-b-2 border-orange-300">
          <h2 className="text-xl text-slate-600 font-medium">Каталог</h2>
        </div>

        <div className="h-full relative w-60 py-1">
          <div
            onClick={handleAll}
            className="cursor-pointer flex items-center p-2 justify-between rounded-md hover:bg-slate-100"
          >
            <div className="flex items-center justify-center w-full">
              <span className="text-amber-600 text-sm font-medium">
                Все продукты
              </span>
            </div>
          </div>

          <div className="my-1 shadow-sm border-b-2 border-orange-300 w-full"></div>

          <div
            onClick={addModal}
            className="cursor-pointer flex items-center p-2 justify-between rounded-md hover:bg-slate-100 "
          >
            <div className="flex items-center justify-center ml-6">
              <span className="text-lime-600 text-sm font-medium">
                Новый продукт
              </span>
            </div>
            <div className="flex items-center ml-auto">
              <PlusCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
            </div>
          </div>

          {isAddingCategory ? (
            <form onSubmit={addedHandleForm}>
              <div className="relative ml-3 p-0">
                <input
                  id="newCategory"
                  type="text"
                  placeholder="Название категории"
                  autoComplete="off"
                  required={true}
                  value={dataCategory?.categoryName || ''}
                  autoFocus
                  onChange={(e) =>
                    setDataCategory({
                      ...dataCategory,
                      categoryName: e.target.value,
                    })
                  }
                  className="block pr-14 py-1.5 px-2 w-56 text-sm text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-300 peer focus:text-lime-600"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="submit"
                    className="text-lime-600 text-sm font-normal"
                  >
                    <CheckCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
                  </button>
                  <XCircleIcon
                    onClick={cancelAddingCategory}
                    className="cursor-pointer w-5 h-5 text-amber-600"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div
              onClick={startAddingCategory}
              className="cursor-pointer flex items-center p-2 justify-between rounded-md hover:bg-slate-100 "
            >
              <div className="flex items-center justify-center ml-6">
                <span className="text-lime-600 text-sm font-medium">
                  Добавить категорию
                </span>
              </div>
              <div className="flex items-center ml-auto">
                <PlusCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
              </div>
            </div>
          )}
          <ul>
            {allCategories.length ? (
              allCategories.map((item) => (
                <div key={item.id}>
                  {/* инпут для редактирования данных категорий */}

                  {isEditingCategory === item.id ? (
                    <form onSubmit={editedCategoryHandleForm}>
                      <div className="relative ml-5 p-0">
                        <input
                          id={item.categoryName}
                          type="text"
                          placeholder=""
                          value={dataEditCategory?.categoryName || ''}
                          autoComplete="off"
                          required={true}
                          autoFocus
                          onChange={(e) =>
                            handleFieldChange('categoryName', e.target.value)
                          }
                          className="block pr-12 py-1.5 px-2 w-[216px] text-sm text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-300 peer focus:text-lime-600"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <button
                            type="submit"
                            className="text-lime-600 text-sm font-normal"
                          >
                            <CheckCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
                          </button>
                          <XCircleIcon
                            onClick={stopEditing}
                            className="cursor-pointer w-5 h-5 text-amber-600"
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    <li className="flex flex-col justify-between">
                      {/** Вывод категорий  */}
                      <div
                        id={`category-${item.id}`}
                        className="flex space-x-2 items-center p-2 rounded-md hover:bg-slate-100"
                      >
                        <div className="cursor-pointer w-52 flex items-center space-x-1 text-slate-600">
                          {subcategoryStates[item.id] ? (
                            <div
                              className="rounded-full hover:bg-slate-200 py-1 "
                              onClick={() => {
                                subcategoryOutput(item.id);
                              }}
                            >
                              <ChevronUpIcon className="cursor-pointer w-3 h-3 text-slate-800 mx-1" />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                subcategoryOutput(item.id);
                              }}
                              className="rounded-full hover:bg-slate-200 py-1 "
                            >
                              <ChevronDownIcon className="cursor-pointer w-3 h-3 text-slate-700 mx-1" />
                            </div>
                          )}
                          <span
                            onClick={() => {
                              // subcategoryOutput(item.id);
                              handleCategoryClick(item.id);
                            }}
                            className="text-slate-700 text-sm font-normal"
                          >
                            {item.categoryName}
                          </span>
                        </div>

                        {item.img !== '/uploads/noPhoto/null.png' &&
                        item.img !== null ? (
                          <Tooltip
                            content="Просмотр обложки"
                            placement="right"
                            style="light"
                            animation="duration-500"
                          >
                            <button
                              type="button"
                              className="flex items-center justify-center"
                              onClick={() =>
                                window.open(`${VITE_URL}${item.img}`, '_blank')
                              }
                            >
                              <PhotoIcon className="cursor-pointer hover:text-lime-600 w-5 h-5 text-slate-700" />
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content="Необходимо добавить обложку"
                            placement="right"
                            style="light"
                            animation="duration-500"
                          >
                            <ExclamationCircleIcon className="cursor-pointer w-5 h-5 text-orange-400" />
                          </Tooltip>
                        )}
                        <div onClick={(e) => toggleMenuCategory(e, item.id)}>
                          <Cog8ToothIcon className="cursor-pointer w-5 h-5 text-slate-700" />
                        </div>
                      </div>

                      {/** Выпадающий список для внесения изменений данных в Категории  */}
                      {selectedCategoryDataId === item.id && (
                        <div
                          ref={menuRef}
                          id={`dropdownRight-${item.id}`}
                          style={{ top: `${menuPosition}px` }}
                          className={`z-10 absolute w-52 ${menuClass} left-24 bg-white divide-y divide-gray-100 rounded-lg shadow border border-slate-100`}
                        >
                          <ul
                            className="py-2 text-xs text-slate-700 cursor-pointer"
                            aria-labelledby="dropdownRightButton"
                          >
                            <div
                              className="absolute rounded-full hover:bg-slate-200 py-1 right-1"
                              onClick={cancelToggleMenuCategory}
                            >
                              <XMarkIcon className="cursor-pointer w-3 h-3 text-slate-600 mx-1" />
                            </div>
                            <li
                              onClick={() => startAddingSubcategory(item.id)}
                              className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100 border-b-2 border-b-lime-500"
                            >
                              <div>
                                <PlusCircleIcon className="w-4 h-4 text-slate-600" />
                              </div>
                              <span className="text-slate-600 text-xs font-normal">
                                Создать подкатегорию
                              </span>
                            </li>
                            <li className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100">
                              <div>
                                <CloudArrowUpIcon className="w-4 h-4 text-slate-600" />
                              </div>
                              <label
                                htmlFor="dropzone-file-sidebar"
                                className="w-full cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="text-slate-600 text-xs font-normal">
                                  Загрузить обложку
                                  <input
                                    id="dropzone-file-sidebar"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileInputChange(e, item.id)
                                    }
                                  />
                                </span>
                              </label>
                            </li>

                            <li
                              onClick={() => startEditingCategory(item.id)}
                              className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100"
                            >
                              <div>
                                <PencilIcon className="w-3 h-3  text-slate-600" />
                              </div>
                              <span className="text-slate-600 text-xs font-normal">
                                Переименовать категорию
                              </span>
                            </li>

                            <li
                              onClick={() => deleteCategoryHandler(item.id)}
                              className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100"
                            >
                              <div>
                                <XCircleIcon className="w-4 h-4 text-slate-600" />
                              </div>
                              <span className="text-slate-600 text-xs font-normal">
                                Удалить категорию
                              </span>
                            </li>
                            {item.img !== '/uploads/noPhoto/null.png' ? (
                              <li
                                onClick={() => handleDeletePhoto(item.id)}
                                className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100"
                              >
                                <div>
                                  <XCircleIcon className="w-4 h-4 text-slate-600" />
                                </div>
                                <span className="text-slate-600 text-xs font-normal">
                                  Удалить обложку
                                </span>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      )}

                      {/** добавление ПОДкатегории */}
                      {isAddingSubcategory &&
                        selectedCategoryIdForSubcategory === item.id && (
                          <form onSubmit={addedHandleFormSubcategory}>
                            <div className="relative ml-5 p-0">
                              <input
                                id="newSubcategory"
                                type="text"
                                placeholder="Название подкатегории"
                                autoComplete="off"
                                required={true}
                                value={dataSubcategory?.subcategoryName || ''}
                                autoFocus
                                onChange={(e) =>
                                  setDataSubcategory({
                                    ...dataSubcategory,
                                    subcategoryName: e.target.value,
                                  })
                                }
                                className="block pr-12 py-1.5 px-2 w-[216px] text-sm text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-300 peer focus:text-lime-600"
                              />
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                <button
                                  type="submit"
                                  className="text-lime-600 text-sm font-normal"
                                >
                                  <CheckCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
                                </button>
                                <XCircleIcon
                                  onClick={cancelAddingSubcategory}
                                  className="cursor-pointer w-5 h-5 text-amber-600"
                                />
                              </div>
                            </div>
                          </form>
                        )}

                      {/** Вывод подкатегорий  */}
                      {subcategoryStates[item.id] && (
                        <ul className="ml-6 space-y-1 text-md">
                          {allSubcategories
                            .filter((sub) => sub.categoryId === item.id)
                            .map((subcategory) => (
                              <li key={subcategory.id}>
                                {isEditingSubcategory === subcategory.id ? (
                                  <form onSubmit={editedSubcategoryHandleForm}>
                                    <div className="relative ml-5 p-0">
                                      <input
                                        id={subcategory.subcategoryName}
                                        type="text"
                                        placeholder=""
                                        value={
                                          dataEditSubcategory?.subcategoryName ||
                                          ''
                                        }
                                        autoComplete="off"
                                        required={true}
                                        autoFocus
                                        onChange={(e) =>
                                          handleFieldChangeSubcategory(
                                            'subcategoryName',
                                            e.target.value
                                          )
                                        }
                                        className="block pr-12 py-1.5 px-2 w-[186px] text-sm text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-300 peer focus:text-lime-600"
                                      />
                                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                        <button
                                          type="submit"
                                          className="text-lime-600 text-sm font-normal"
                                        >
                                          <CheckCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
                                        </button>
                                        <XCircleIcon
                                          onClick={stopEditingSubcategory}
                                          className="cursor-pointer w-5 h-5 text-amber-600"
                                        />
                                      </div>
                                    </div>
                                  </form>
                                ) : (
                                  <div className="flex items-center p-2 justify-between rounded-md hover:bg-slate-100">
                                    <div
                                      onClick={() => {
                                        handleSubcategoryClick(subcategory.id);
                                      }}
                                      className="cursor-pointer w-52 flex items-center text-slate-600"
                                    >
                                      <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                                      <span className="text-slate-600 text-sm font-normal">
                                        {subcategory.subcategoryName}
                                      </span>
                                    </div>
                                    <div
                                      className="ml-auto"
                                      onClick={(e) =>
                                        toggleMenuSub(e, subcategory.id)
                                      }
                                    >
                                      <Cog8ToothIcon className="cursor-pointer w-5 h-5 text-slate-600" />
                                    </div>
                                  </div>
                                )}

                                {/** Выпадающий список для внесения изменений данных в ПОДкатегории */}
                                {selectedSubcategoryDataId === subcategory.id &&
                                  actionMenuForSub && (
                                    <div
                                      ref={menuRef}
                                      id={`dropdownRight-${subcategory.id}`}
                                      className={`z-10 absolute w-52 ${menuClassSub} top-${menuPosition.top} left-24 bg-white divide-y divide-gray-100 rounded-lg shadow border border-slate-100`}
                                    >
                                      <ul
                                        className="py-2 text-xs text-slate-700 cursor-pointer"
                                        aria-labelledby="dropdownRightButton"
                                      >
                                        <div
                                          className="absolute rounded-full hover:bg-slate-200 py-1 right-1"
                                          onClick={cancelToggleMenuSub}
                                        >
                                          <XMarkIcon className="cursor-pointer w-3 h-3 text-slate-600 mx-1" />
                                        </div>
                                        <li
                                          onClick={() =>
                                            startEditingSubcategory(
                                              subcategory.id
                                            )
                                          }
                                          className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100"
                                        >
                                          <div>
                                            <PencilIcon className="w-3 h-3  text-slate-600" />
                                          </div>
                                          <span className="text-slate-600 text-xs font-normal">
                                            Переименовать подкатегорию
                                          </span>
                                        </li>

                                        <li
                                          onClick={() =>
                                            deleteSubcategoryHandler(
                                              subcategory.id
                                            )
                                          }
                                          className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100"
                                        >
                                          <div>
                                            <XCircleIcon className="w-4 h-4 text-slate-600" />
                                          </div>
                                          <span className="text-slate-600 text-xs font-normal">
                                            Удалить подкатегорию
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  )}
                  {allSubcategories.filter((sub) => sub.categoryId === item.id)
                    .length === 0 && (
                    <div className="flex items-center justify-center w-38">
                      <span className="text-slate-600 text-sm font-normal">
                        Cписок подкатегорий пуст
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-38">
                <span className="text-slate-600 text-sm font-normal">
                  Cписок категорий пуст
                </span>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;
