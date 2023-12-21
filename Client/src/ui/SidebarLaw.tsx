import { DocumentTextIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useState } from 'react';

interface SidebarLawProps<T> {
  data?: T[] | undefined;
  onAddClick?: (item: T) => void | undefined;
  onEditClick?: (item: T) => void | undefined;
  title: string;
}

const SidebarLaw: FC<SidebarLawProps<T>> = ({
  data,
  onAddClick,
  onEditClick,
  title,
}) => {
  const [isOnEditClickCalled, setOnEditClickCalled] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли данные и вызываем onEditClick с первым элементом, если он еще не был вызван
    if (data && data.length > 0 && onEditClick && !isOnEditClickCalled) {
      onEditClick(data[0]);
      setOnEditClickCalled(true);
    }
  }, [data, onEditClick, isOnEditClickCalled]);

  return (
    <div className="flex flex-col w-56 bg-white h-full border-r-2 border-orange-300">
      <div className="h-16 flex items-center justify-center border-b-2 border-orange-300 text-center">
        <h2 className="text-xl text-slate-600 font-medium">{title}</h2>
      </div>

      <div className="h-full w-52 flex">
        <ul className="py-2">
          <div
            onClick={onAddClick}
            className="cursor-pointer flex items-center p-2 justify-between rounded-md hover:bg-slate-100"
          >
            <div className="flex items-center justify-center ml-6">
              <span className="text-lime-600 text-sm font-medium">
                Добавить документ
              </span>
            </div>
            <div className="flex items-center ml-auto">
              <PlusCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
            </div>
          </div>
          {data?.map((item, index) => (
            <li key={index} className="flex flex-col justify-between">
              <div
                className="flex items-center p-2 rounded-md hover:bg-slate-100"
                onClick={() => onEditClick && onEditClick(item)}
              >
                <div className="cursor-pointer w-48 flex items-center space-x-4 text-slate-600">
                  <div className="rounded-full py-1">
                    <DocumentTextIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
                  </div>
                  <span className="text-slate-600 text-sm font-normal">
                    {item.title}
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

export default SidebarLaw;
