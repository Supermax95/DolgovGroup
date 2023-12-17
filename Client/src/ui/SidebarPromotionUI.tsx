import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IPromotionSidebarArray {
  id: number;
  href: string;
  name: string;
}

interface IPromotionsSidebar {
  links: IPromotionSidebarArray[];
  title: string;
}

const PromotionSidebarUI: FC<IPromotionsSidebar> = ({ links, title }) => {
  return (
    <div className="flex flex-col w-64 bg-white h-full border-r-2 border-orange-300">
      <div className="h-12 flex items-center justify-center border-b-2 border-orange-300">
        <h2 className="text-lg font-bold text-slate-600">{title}</h2>
      </div>
      <ul className="pt-2 pb-2 space-y-1">
        {links.map((item) => (
          <li key={item.id} className="flex items-center">
            <Link
              to={item.href}
              className="flex justify-between items-center p-2 rounded-md hover:bg-slate-100"
            >
              <span className="text-slate-600 text-sm font-normal">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionSidebarUI;
