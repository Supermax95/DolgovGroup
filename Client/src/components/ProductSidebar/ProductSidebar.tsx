import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  Cog8ToothIcon,
  PencilIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import addCategory from '../../Redux/thunks/Category/addCategory.api';
import deleteCategory from '../../Redux/thunks/Category/deleteCategory.api';

interface ICategory {
  id?: number;
  categoryName?: string | undefined;
}

const ProductSidebar: FC = () => {
  const dispatch = useAppDispatch();

  const allCategory = useAppSelector<ICategory[]>(
    (state) => state.categorySlice.data
  );
  console.log('allCategory', allCategory);

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  //* добавление категории
  const [isAddingCategory, setAddingCategory] = useState<boolean>(false);
  const [dataCategory, setDataCategory] = useState<
    ICategory | null | undefined
  >({ id: 0, categoryName: '' });

  // ? редактирование категории
  const [isEditingCategory, setEditingCategory] = useState<number | null>(null);
  const [dataEditCategory, setDataEditCategory] = useState<
    ICategory | null | undefined
  >({ id: 0, categoryName: '' });
  const [editingCategoryData, setEditingCategoryData] = useState<ICategory | null>(null);


  const menuRef = useRef<HTMLDivElement | null>(null);
  // const [menuPosition, setMenuPosition] = useState<{
  //   top: number;
  //   left: number;
  // }>({
  //   top: 0,
  //   left: 0,
  // });
  //console.log('menuPosition', menuPosition);

  const toggleMenu = (id: number): void => {
    console.log('id', id);

    setSelectedCategory(id);
    setMenuOpen(!isMenuOpen);
    // setMenuPosition({ top: 0, left: 0 });
  };

  const menuClass = isMenuOpen ? 'block' : 'hidden';

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      selectedCategory !== null
    ) {
      setMenuOpen(false);
      setSelectedCategory(null);
      //   setMenuPosition({
      //     top: menuPosition.top + 12,
      //     left: menuPosition.top + 24,
      //   });
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

  // ? логика редактирование категории
  //* выбирает нужную категорию товара по id
  // const startEditingCategory = (id: number): void => {
  //   setEditingCategory(id);
  // };

  const stopEditing = (): void => {
    setEditingCategory(null);
  };

  // const handleFieldChange = (item: string, value: string): void => {
  //   console.log('item', item);
  //   console.log('valuevalue', value);

  //   setDataEditCategory((prev) => ({
  //     ...prev,
  //     [item]: value,
  //   }));
  // };
  const handleFieldChange = (item: string, value: string): void => {
    setDataEditCategory((prev) => ({
      ...prev,
      [item]: value,
    }));
    setEditingCategoryData((prev) => ({
      ...prev,
      [item]: value,
    }));
  };
  

  const startEditingCategory = (id: number): void => {
    setEditingCategory(id);
    const categoryToEdit = allCategory.find((item) => item.id === id);
    setEditingCategoryData(categoryToEdit || null);
  };
  
  const editedCategoryHandleForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
  };

  // ? удаление категории
  const deleteCategoryHandler = (id: number): void => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="flex flex-col w-52 bg-white h-full border-r-2 border-orange-300">
      <div className="h-16 flex items-center justify-center border-b-2 border-orange-300">
        <h2 className="text-lg font-normal text-slate-600">Каталог</h2>
      </div>
      <div className="h-full relative w-48">
        <ul className="pt-4 pb-2 space-y-1 text-md">
          <li className="h-full">
            {isAddingCategory ? (
              <form onSubmit={addedHandleForm}>
                <div className="relative">
                  <input
                    id="newCategory"
                    type="text"
                    placeholder=""
                    autoComplete="off"
                    required={true}
                    value={dataCategory?.categoryName || ''}
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
                    className="block py-2.5 px-0 w-full text-xs text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                  />
                  <label
                    htmlFor="newCategory"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-normal peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                  >
                    Название категории
                  </label>
                </div>
                <div className="flex items-center p-2 justify-between  ">
                  <button
                    type="submit"
                    className="text-lime-600 text-sm font-normal"
                  >
                    Сохранить
                  </button>
                  <div>
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
                <span className="text-lime-600 text-sm font-normal">
                  Добавить категорию
                </span>
                <div>
                  <PlusCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
                </div>
              </div>
            )}
          </li>

          <li className="h-full">
            {allCategory.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 justify-between rounded-md hover:bg-slate-100 "
              >
                <div className="">
                  {isEditingCategory === item.id ? (
                    <form
                    //onSubmit={editedCategoryHandleForm}
                    >
                      <input
                        type="text"
                        id={item.categoryName}
                        placeholder=""
                        value={editingCategoryData?.categoryName || ''}
                        autoComplete="off"
                        required={true}
                        className="block py-2.5 px-0 w-full text-xs text-slate-500 text-normal bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                        // onChange={(e) =>
                        //   handleFieldChange(item.categoryName, e.target.value)
                        // }
                        // onChange={(e) =>
                        //   setDataEditCategory({
                        //     ...dataEditCategory,
                        //     categoryName: e.target.value,
                        //   })
                        // }
                        onChange={(e) => handleFieldChange('categoryName', e.target.value)}
                      />
                    </form>
                  ) : (
                    <span className="text-slate-600 text-sm font-normal">
                      {item.categoryName}
                    </span>
                  )}
                </div>
                <div onClick={() => toggleMenu(item.id)}>
                  <Cog8ToothIcon className="cursor-pointer w-5 h-5 text-slate-600" />
                </div>
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
