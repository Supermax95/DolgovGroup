import { FC, useEffect, useRef, useState } from 'react';
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
} from '@heroicons/react/24/outline';
import addCategory from '../../../../Redux/thunks/Category/addCategory.api';
import deleteCategory from '../../../../Redux/thunks/Category/deleteCategory.api';
import editCategory from '../../../../Redux/thunks/Category/editCategory.api';
import addSubcategory from '../../../../Redux/thunks/SubCategory/addSubcategory.api';
import editSubcategory from '../../../../Redux/thunks/SubCategory/editSubcategory.api';
import deleteSubcategory from '../../../../Redux/thunks/SubCategory/deleteSubcategory.api';

interface ICategory {
  id?: number;
  categoryName?: string;
}

interface ISubcategory {
  id: number;
  categoryId: number;
  subcategoryName: string;
}

interface ProductSidebarProps {
  categories: ICategory[];
  onCategorySelect: (category: ICategory | null) => void;
  onSubcategorySelect: (subcategory: ISubcategory | null) => void;
}

const ProductSidebar: FC<ProductSidebarProps> = ({
  categories,
  onCategorySelect,
  onSubcategorySelect,
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [actionMenuForCategory, setActionMenuForCategory] =
    useState<boolean>(false); //* меню для редактирования категории
  const [actionMenuForSub, setActionMenuForSub] = useState<boolean>(false); //* меню для редактирования подкатегории

  const [menuPosition, setMenuPosition] = useState(0);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuClass = actionMenuForCategory ? 'block' : 'hidden';
  const menuClassSub = actionMenuForSub ? 'block' : 'hidden';

  //* всплывающее меню для каждой КАТЕГОРИИ
  //! при повторном нажатии на шестерёнку - не закрывается
  const toggleMenuCategory = (e: React.MouseEvent, id: number): void => {
    console.log('id', id);

    e.stopPropagation(); // Это предотвратит всплытие события и отменит срабатывание обработчика событий на родительском элементе

    setActionMenuForCategory(!actionMenuForCategory);
    setSelectedSubcategoryDataId(null);
    setSelectedCategoryDataId(id);
    console.log('selectedCategoryDataId=========>', selectedCategoryDataId);

    calculateMenuPosition(e);
    /**
     * какоя-то хуйня выводится 
     * id 2
      ProductSidebar.tsx:109 selectedCategoryDataId=========> 4
    а работает верно
     */
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

  const calculateMenuPosition = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    console.log('target', target);

    const rect = target.getBoundingClientRect();
    console.log('recrectrectrectt', rect);

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    console.log('scrollTop', scrollTop);

    console.log('rect.bottom + scrollTop', rect.top + scrollTop + 500);
    const newTop = rect.top + scrollTop + 500;

    setMenuPosition(newTop);

    console.log('menuPosition====>', menuPosition);
  };

  //* всплывающее меню для каждой ПОДкатегории
  //! при повторном нажатии на шестерёнку - не закрывается
  const toggleMenuSub = (e: React.MouseEvent, id: number): void => {
    console.log('id', id);
    e.stopPropagation(); // Это предотвратит всплытие события и отменит срабатывание обработчика событий на родительском элементе

    setActionMenuForSub(!actionMenuForSub);
    setSelectedCategoryDataId(null);
    setSelectedSubcategoryDataId(id);
    console.log('selectedSubcategoryDataId', selectedSubcategoryDataId);

    calculateMenuPosition(e);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////

  // ? логика добавления категории
  const startAddingCategory = (): void => {
    setAddingCategory(true);
  };

  const cancelAddingCategory = (): void => {
    setAddingCategory(false);
    setDataCategory('');
  };

  const addedHandleForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      //! мб, добавить скролл или уведомление при добалении категории и подкатегории
      if (addCategory) {
        await dispatch(
          addCategory({
            newCategory: dataCategory,
          })
        );
        setAddingCategory(false);
        setDataCategory('');
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
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

    try {
      if (editCategory) {
        const result = await dispatch(
          editCategory({
            categoryId: dataEditCategory.id,
            newCategoryName: dataEditCategory?.categoryName,
          })
        );
        if (editCategory.fulfilled.match(result)) {
          setEditingCategory(null);
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
    }
  };

  // ? удаление категории
  const deleteCategoryHandler = (id: number): void => {
    dispatch(deleteCategory(id));
  };

  //! вывод подкатегории в сайдбаре
  const subcategoryOutput = (id: number) => {
    const subcategory = allSubcategories.filter((sub) => sub.categoryId === id);
    setSelectedSubcategoryData(subcategory);
    //* используется для обновления состояния подкатегории
    setSubcategoryStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
      //! мб, добавить скролл или уведомление при добалении категории и подкатегории
      if (addSubcategory) {
        await dispatch(
          addSubcategory({
            newSubcategory: dataSubcategory,
            categoryId: selectedCategoryIdForSubcategory,
          })
        );
        setAddingSubcategory(false);
        setDataSubcategory('');
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
    }
  };

  // ? логика редактирования ПОДкатегории
  const startEditingSubcategory = (id: number): void => {
    setEditingSubcategory(id);
    const subcategoryToEdit = allSubcategories.find((sub) => sub.id === id);
    console.log('subcategoryToEdit', subcategoryToEdit);

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

    try {
      if (editSubcategory) {
        const result = await dispatch(
          editSubcategory({
            subcategoryId: dataEditSubcategory.id,
            newSubcategoryName: dataEditSubcategory?.subcategoryName,
          })
        );
        if (editSubcategory.fulfilled.match(result)) {
          setEditingSubcategory(null);
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
    }
  };

  // ? удаление ПОДкатегории
  const deleteSubcategoryHandler = (id: number): void => {
    dispatch(deleteSubcategory(id));
  };

  /** Рендер карточек на странице */
  //! рендерит карточки категорий
  const handleCategoryClick = (selectedCategoryId: number) => {
    const currentCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    //* сбрасывает подкатегории и позволяет переключаться между Категориями
    onSubcategorySelect(null);

    // Добавляем вызов onCategorySelect, чтобы передать выбранную категорию наружу
    onCategorySelect(currentCategory || null);
  };

  //! рендерит карточки подкатегорий
  const handleSubcategoryClick = (selectedSubcategory: number) => {
    const currentSubcategory = allSubcategories.find(
      (sub) => sub.id === selectedSubcategory
    );
    //* сбрасывает категории и позволяет переключаться между ПОДкатегориями
    onCategorySelect(null);
    // Добавляем вызов onSubcategorySelect, чтобы передать выбранную подкатегорию наружу
    onSubcategorySelect(currentSubcategory || null);
  };

  return (
    <div className="flex flex-col w-64 bg-white h-full border-r-2 border-orange-300">
      <div className="h-12 flex items-center justify-center border-b-2 border-orange-300">
        <h2 className="text-lg font-bold text-slate-600">Каталог</h2>
      </div>

      <div className="h-full relative w-60">
        <ul className="pt-4 pb-2 space-y-1 text-md">
          <li className="h-full">
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
                className="cursor-pointer flex items-center p-2 justify-between rounded-md hover:bg-slate-100"
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
          </li>

          <li className="h-full">
            {allCategories.map((item) => (
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
                  <div className="flex flex-col justify-between">
                    {/** Вывод категорий  */}
                    <div
                      id={`category-${item.id}`}
                      className="flex justify-between items-center p-2 rounded-md hover:bg-slate-100"
                    >
                      <div
                        onClick={() => {
                          subcategoryOutput(item.id);
                          handleCategoryClick(item.id); // Добавлено
                        }}
                        className="cursor-pointer w-52 flex items-center text-slate-600"
                      >
                        {subcategoryStates[item.id] ? (
                          <ChevronUpIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                        ) : (
                          <ChevronDownIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                        )}
                        <span className="text-slate-600 text-sm font-normal">
                          {item.categoryName}
                        </span>
                      </div>
                      <div onClick={(e) => toggleMenuCategory(e, item.id)}>
                        <Cog8ToothIcon
                          onClick={() =>
                            console.log(
                              '=================>фывапролд',
                              menuPosition
                            )
                          }
                          className="cursor-pointer w-5 h-5 text-slate-600"
                        />
                      </div>
                    </div>

                    {/** Выпадающий список для внесения изменений данных в Категории  */}
                    {selectedCategoryDataId === item.id && (
                      <div
                        //! появляться должно при нажатии на конкретную категорию по шестеррёнке
                        ref={menuRef}
                        id={`dropdownRight-${item.id}`}
                        className={`z-10 absolute w-52 ${menuClass} top-${menuPosition} left-24 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                      >
                        <ul
                          className="py-2 text-xs text-slate-700 cursor-pointer"
                          aria-labelledby="dropdownRightButton"
                        >
                          <li
                            onClick={() => startAddingSubcategory(item.id)}
                            className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100 border-b-2 border-b-lime-500"
                          >
                            <div>
                              <PlusCircleIcon className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className="block ">Создать подкатегорию</span>
                          </li>
                          <li
                            onClick={() => startEditingCategory(item.id)}
                            className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100"
                          >
                            <div>
                              <PencilIcon className="w-3 h-3  text-slate-600" />
                            </div>
                            <span className="block">
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
                            <span className="block">Удалить категорию</span>
                          </li>
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
                                    onClick={() =>
                                      handleSubcategoryClick(subcategory.id)
                                    }
                                    className="cursor-pointer w-52 flex items-center text-slate-600"
                                  >
                                    <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                                    <span className="text-lime-600 text-sm font-normal">
                                      {subcategory.subcategoryName}
                                    </span>
                                  </div>
                                  <div
                                    className="ml-auto"
                                    onClick={(e) =>
                                      toggleMenuSub(e, subcategory.id)
                                    }
                                  >
                                    <Cog8ToothIcon className="cursor-pointer w-5 h-5 text-lime-600" />
                                  </div>
                                </div>
                              )}

                              {/** Выпадающий список для внесения изменений данных в ПОДкатегории */}
                              {selectedSubcategoryDataId === subcategory.id &&
                                actionMenuForSub && (
                                  <div
                                    //! появляться должно при нажатии на конкретную категорию по шестеррёнке
                                    ref={menuRef}
                                    id={`dropdownRight-${subcategory.id}`}
                                    className={`z-10 absolute w-52 ${menuClassSub} top-${menuPosition.top} left-24 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                                  >
                                    <ul
                                      className="py-2 text-xs text-slate-700 cursor-pointer"
                                      aria-labelledby="dropdownRightButton"
                                    >
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
                                        <span className="block">
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
                                        <span className="block">
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
                  </div>
                )}
              </div>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSidebar;