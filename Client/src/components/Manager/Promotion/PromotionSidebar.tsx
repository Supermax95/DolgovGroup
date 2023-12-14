import  { FC } from 'react';
import { ListBulletIcon, UserIcon } from '@heroicons/react/24/outline';
import PromotionSidebarUI from '../../../ui/SidebarPromotionUI';


const PromotionSidebar: FC = () => {
  const promoSidebar = {
    links: [
      {
        id: 1,
        href: '/carousel',
        name: 'Акции в карусели',
        childrenIcon: <ListBulletIcon className="w-6 h-6 text-slate-600" />,
      },
      {
        id: 2,
        href: '/nocarousel',
        name: 'Акции вне карусели',
        childrenIcon: <UserIcon className="w-6 h-6 text-slate-600" />,
      },
    ],
  };

  return (
    <div>
      {promoSidebar.links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className="flex items-center space-x-2"
        >
          {link.childrenIcon}
          <span className="text-slate-600">{link.name}</span>
        </a>
      ))}

      <PromotionSidebarUI/>
    </div>
  );
};

export default PromotionSidebar;
