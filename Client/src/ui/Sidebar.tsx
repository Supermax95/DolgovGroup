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
    <div className="flex flex-col w-64 bg-white h-full border-r border-slate-300">
      <div className="h-16 flex items-center justify-center border-b">
        <div
          className="text-xl text-slate-700 font-medium"
          onClick={() => handleItemChange(null)}
        >
          {title}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="py-2 space-y-1">
          <li>
            <button
              className="flex items-center w-full h-12 px-4 text-slate-700 hover:text-amber-600 focus:outline-none focus:bg-slate-100"
              onClick={() => handleItemChange(null)}
            >
              <span
                className={`mr-4 ${
                  isItemListVisible ? 'transform rotate-90' : ''
                } transition-transform`}
              >
                ▶
              </span>
              <span className="text-sm text-slate-700 font-bold">
                Все {title.toLowerCase()}
              </span>
            </button>
          </li>
          {isItemListVisible &&
            items.map((item, index) => (
              <li key={index}>
                <button
                  className={`flex items-center w-full h-12 px-4 text-slate-600 text-sm font-normal hover:text-amber-600 focus:outline-none focus:bg-slate-100 ${
                    selectedItem === item ? 'bg-slate-100' : ''
                  }`}
                  onClick={() => handleItemChange(item)}
                >
                  <span className="mr-4"></span>
                  <span className="text-sm">{displayKey(item)}</span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
