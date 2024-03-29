import { DocumentTextIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { IQuestion } from './Questions';

interface SidebarLawProps<ILaw> {
  data?: IQuestion[] | undefined;
  onAddClick?: () => void | undefined;
  onEditClick?: (item: ILaw) => void;
  title: string;
}

const SidebarQuestion: FC<SidebarLawProps<IQuestion>> = ({
  data,
  onAddClick,
  onEditClick,
  title,
}) => {
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
                Добавить вопрос
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

export default SidebarQuestion;
