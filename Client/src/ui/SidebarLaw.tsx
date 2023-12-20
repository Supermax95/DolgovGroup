import { FC } from 'react';

interface SidebarLawProps<T> {
  data?: any[] | undefined;
  onEditClick?: (item: any) => void | undefined;
  title: string;
}
console.log('ebanina');

const SidebarLaw: FC<SidebarLawProps<T>> = ({ data, onEditClick, title }) => {
  const titles = data?.map((item) => item.title) || [];
  return (
    <div className="flex flex-col w-56 bg-white h-full border-r-2 border-orange-300">
      <div className="h-16 flex items-center justify-center border-b-2 border-orange-300 text-center">
        <h2 className="text-lg font-bold text-slate-600">{title}</h2>
      </div>

      <div className="h-full w-52 flex">
        <ul className="py-2 ">
          <li className="flex flex-col justify-between">
            <div className="flex items-center p-2 rounded-md hover:bg-slate-100">
              <div className="cursor-pointer w-48 flex items-center space-x-10 text-slate-600"></div>
            </div>
          </li>

          {titles.map((item, index) => (
            <li key={index} className="flex flex-col justify-between">
              <div
                className="flex items-center p-2 rounded-md hover:bg-slate-100"
                onClick={() => onEditClick && onEditClick(data[index])}
              >
                <span className="text-slate-600 text-sm font-normal ml-4">
                  {item}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarLaw;
