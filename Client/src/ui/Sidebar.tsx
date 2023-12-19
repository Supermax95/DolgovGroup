import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { FC } from 'react';

interface SidebarProps<T> {
  items: T[];
  onItemSelect: (selectedItem: T) => void;
  title: string;
  setCurrentPage: (page: number) => void;
  displayKey: (item: T) => string;
}

const Sidebar: FC<SidebarProps<any>> = ({
  items,
  onItemSelect,
  title,
  setCurrentPage,
  displayKey,
}) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const [isItemListVisible, setItemListVisible] = useState(false);

  // console.log('items:', items);
  // console.log('onItemSelect', onItemSelect);

  const handleItemChange = (item: T | null) => {
    if (item === null) {
      setSelectedItem(null);
      setItemListVisible(!isItemListVisible);
      setCurrentPage(1);
      onItemSelect(null);
    } else {
      setSelectedItem(item);
      onItemSelect(item);
      setCurrentPage(1);
      setItemListVisible(true);
    }
  };

  return (
    <div className="flex flex-col w-56 bg-white h-full border-r-2 border-orange-300">
      <div className="h-16 flex items-center justify-center border-b-2 border-orange-300 text-center">
        <h2 className="text-lg font-bold text-slate-600">{title}</h2>
      </div>

      <div className="h-full w-52 flex">
        <ul className="py-2 ">
          <li className="flex flex-col justify-between">
            <div className="flex items-center p-2 rounded-md hover:bg-slate-100">
              <div
                className="cursor-pointer w-48 flex items-center space-x-10 text-slate-600"
                onClick={() => handleItemChange(null)}
              >
                {isItemListVisible ? (
                  <div className="rounded-full hover:bg-slate-200 py-1 ">
                    <ChevronUpIcon className="cursor-pointer w-3 h-3 text-slate-600 mx-1" />
                  </div>
                ) : (
                  <div className="rounded-full hover:bg-slate-200 py-1 ">
                    <ChevronDownIcon className="cursor-pointer w-3 h-3 text-slate-600 mx-1" />
                  </div>
                )}
                <span className="text-slate-600 text-sm font-normal ml-6">
                  Все {title.toLowerCase()}
                </span>
              </div>
            </div>
          </li>
          {isItemListVisible &&
            items.map((item, index) => (
              <li key={index} className="flex flex-col justify-center">
                <div
                  className="flex items-center p-2 rounded-md hover:bg-slate-100"
                  onClick={() => handleItemChange(item)}
                >
                  <div className="cursor-pointer w-48 flex items-center space-x-9 text-slate-600">
                    {title === 'Города' ? (
                      <div className="rounded-full py-1">
                        <BuildingOffice2Icon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
                      </div>
                    ) : item === 'Новый сотрудник' ? (
                      <div className="rounded-full py-1">
                        <UserPlusIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
                      </div>
                    ) : item === 'Активные' ? (
                      <div className="rounded-full py-1">
                        <CheckCircleIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
                      </div>
                    ) : item === 'Неактивные' ? (
                      <div className="rounded-full py-1">
                        <XCircleIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
                      </div>
                    ) : (
                      <div className="rounded-full py-1">
                        <UserIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
                      </div>
                    )}
                    <span className="text-slate-600 text-sm font-normal">
                      {displayKey(item)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
