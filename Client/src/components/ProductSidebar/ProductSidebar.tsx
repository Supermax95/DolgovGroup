import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  Cog8ToothIcon,
  PencilIcon,
  PlusCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import addCategory from '../../Redux/thunks/Category/addCategory.api';
import deleteCategory from '../../Redux/thunks/Category/deleteCategory.api';
import editCategory from '../../Redux/thunks/Category/editCategory.api';

interface ICategory {
  id?: number;
  categoryName?: string | undefined;
}

interface ISubcategory {
  id: number;
  categoryId: number;
  subcategoryName: string;
}

const ProductSidebar: FC = () => {
  const dispatch = useAppDispatch();

  const allCategories = useAppSelector<ICategory[]>(
    (state) => state.categorySlice.data
  );

  const allSubcategories = useAppSelector(
    (state) => state.subcategorySlice.data
  );
  //console.log('allSubcategories', allSubcategories);

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState<
    ISubcategory[]
  >([]);

  //* добавление категории
  const [isAddingCategory, setAddingCategory] = useState<boolean>(false);
  const [dataCategory, setDataCategory] = useState<
    ICategory | null | undefined
  >({ id: 0, categoryName: '' });

  // ? редактирование категории
  const [isEditingCategory, setEditingCategory] = useState<number | null>(null);
  const [dataEditCategory, setDataEditCategory] = useState<ICategory | null>(
    null
  );

  //*
  const [subcategoryStates, setSubcategoryStates] = useState<{
    [key: number]: boolean;
  }>({});

  const menuRef = useRef<HTMLDivElement | null>(null);
  // const [menuPosition, setMenuPosition] = useState<{
  //   top: number;
  //   left: number;
  // }>({
  //   top: 0,
  //   left: 0,
  // });
  //console.log('menuPosition', menuPosition);

  //* дополнительное меню для каждой категории
  //!  удаётся закрыть по шестерёнке при повторном нажатии, но не по любой области
  const toggleMenu = (id: number): void => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
      setMenuOpen(false);
    } else {
      setSelectedCategory(id);
      setMenuOpen(true);
    }
  };
  const menuClass = isMenuOpen ? 'block' : 'hidden';

  // позволяет закрывать при нажатии на любую область
  const handleClickOutside = (e: MouseEvent): void => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      selectedCategory !== null
    ) {
      setMenuOpen(false);
      setSelectedCategory(null);
      setEditingCategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ? логика добавления категории
  const startAddingCategory = (): void => {
    setAddingCategory(true);
  };

  const cancelAddingCategory = (): void => {
    setAddingCategory(false);
    setDataCategory(null);
  };

  const addedHandleForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (addCategory) {
        await dispatch(
          addCategory({
            newCategory: dataCategory,
          })
        );
        setAddingCategory(false);
        setDataCategory(null);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
    }
  };

  // ? логика редактирования категории
  //* выбирает нужную категорию товара по id
  const startEditingCategory = (id: number): void => {
    setEditingCategory(id);
    //* ищет конкретное поле
    const categoryToEdit = allCategories.find((item) => item.id === id);
    //* здесь передаётся...
    setMenuOpen(false);

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

  //* вывод подкатегории
  const subcategoryOutput = (id: number) => {
    console.log(id);

    const subcategory = allSubcategories.filter((sub) => sub.categoryId === id);

    console.log('subcategosubcategorysubcategoryry', subcategory);

    setSelectedSubcategoryData(subcategory);

    //* используется для обновления состояния подкатегории
    setSubcategoryStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
                {/* <div
                //!вариант подвинуть инпут
                className="relative ml-2 p-2"> */}
                <div className="relative ml-6 p-2">
                  <input
                    id="newCategory"
                    type="text"
                    placeholder="Название категории"
                    autoComplete="off"
                    required={true}
                    value={dataCategory?.categoryName || ''}
                    autoFocus
                    //! если будет map
                    // onChange={(value: string) =>
                    //   setDataCategory({
                    //     ...dataCategory,
                    //     categoryName: value,
                    //   })
                    onChange={(e) =>
                      setDataCategory({
                        ...dataCategory,
                        categoryName: e.target.value,
                      })
                    }
                    className="block pr-14 py-1.5 px-2 w-52 text-sm text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                    //!вариант подвинуть инпут
                    // className="block pr-14 py-1.5 px-2 w-56 text-sm text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
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
                  <span className="text-lime-600 text-sm font-bold">
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
                {/* <div className="flex items-center p-2 justify-between"> */}
                {isEditingCategory === item.id ? (
                  <form onSubmit={editedCategoryHandleForm}>
                    <div className="relative ml-6 p-2">
                      <input
                        type="text"
                        id={item.categoryName}
                        placeholder=""
                        value={dataEditCategory?.categoryName || ''}
                        autoComplete="off"
                        required={true}
                        autoFocus
                        className="block pr-14 py-1.5 px-2 w-52 text-sm text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                        onChange={(e) =>
                          handleFieldChange('categoryName', e.target.value)
                        }
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
                  <div className="cursor-pointer flex flex-col justify-between">
                    <div className="cursor-pointer flex justify-between items-center p-2 rounded-md hover:bg-slate-100">
                      <div
                        onClick={() => subcategoryOutput(item.id)}
                        className="w-52 flex items-center text-slate-600"
                      >
                        {subcategoryStates[item.id] ? (
                          <ChevronDownIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                        ) : (
                          <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                        )}
                        <span className="text-slate-600 text-sm font-normal">
                          {item.categoryName}
                        </span>
                      </div>
                      <div onClick={() => toggleMenu(item.id)}>
                        <Cog8ToothIcon className="cursor-pointer w-5 h-5 text-slate-600" />
                      </div>
                    </div>

                    {/* 
                    <div className="relitive"
                    //! здесь неудавшийся вариант позиционирования шестерёнки :( )>
                      <div
                        className="cursor-pointer flex justify-between items-center p-2 rounded-md hover:bg-slate-100 relative"
                        onClick={() => subcategoryOutput(item.id)}
                      >
                        <div className="flex items-center text-slate-600">
                          {subcategoryStates[item.id] ? (
                            <ChevronDownIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                          ) : (
                            <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                          )}
                          <span className="text-slate-600 text-sm font-normal">
                            {item.categoryName}
                          </span>
                        </div>
                      </div>
                      <div className="absolute rigth-12">
                        <Cog8ToothIcon
                          className="cursor-pointer w-5 h-5 text-slate-600"
                          onClick={() => toggleMenu(item.id)}
                        />
                      </div>
                    </div> */}

                    {subcategoryStates[item.id] && (
                      <ul className="ml-6 space-y-1 text-md">
                        {allSubcategories
                          .filter((sub) => sub.categoryId === item.id)
                          .map((subcategory) => (
                            <li key={subcategory.id}>
                              <div className="cursor-pointer flex items-center p-2 justify-between rounded-md hover:bg-slate-100">
                                <div className="flex items-center text-slate-600">
                                  <ChevronRightIcon className="cursor-pointer w-3 h-3 text-slate-600 mr-2" />
                                  <span className="text-slate-600 text-sm font-normal">
                                    {subcategory.subcategoryName}
                                  </span>
                                </div>
                                <div
                                  className="ml-auto"
                                  // onClick={() => toggleMenu(item.id)}
                                >
                                  <Cog8ToothIcon className="cursor-pointer w-5 h-5 text-lime-600" />
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                )}

                {selectedCategory === item.id && (
                  <div
                    //! появляться должно при нажатии на конкретную категорию по шестеррёнке
                    ref={menuRef}
                    id={`dropdownRight-${item.id}`}
                    className={`z-10 absolute ${menuClass} top-32 w-52 left-24  bg-white divide-y divide-gray-100 rounded-lg shadow`}
                    //className={`z-10 absolute ${menuClass} top-${menuPosition.top} left-${menuPosition.left} bg-white divide-y divide-gray-100 rounded-lg shadow`}
                  >
                    <ul
                      className="py-2 text-xs text-slate-700 cursor-pointer"
                      aria-labelledby="dropdownRightButton"
                    >
                      <li className="flex items-center px-4 py-2 space-x-2 hover:bg-slate-100 border-b-2 border-b-lime-500">
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
                        <span className="block">Переименовать категорию</span>
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
              </div>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSidebar;
