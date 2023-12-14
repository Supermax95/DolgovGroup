import React, { FC } from 'react';
import { ListBulletIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface IPromotionsSidebarArray {
  id: number;
  href: string;
  name: string;
  childrenIcon: React.ReactNode;
}

interface IPromotionsSidebar {
  links: IPromotionsSidebarArray[];
}

const PromotionSidebarUI: FC<IPromotionsSidebar> = ({ links }) => {
  return (
    <div className="h-full w-60 border-r-2 border-orange-300">
      <div className="h-16 border-b-2 border-orange-300">
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li>
            {links.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-100"
              >
                <div>{item.childrenIcon}</div>
                <span className="text-slate-600 text-sm font-normal">
                  {item.name}
                </span>
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PromotionSidebarUI;
