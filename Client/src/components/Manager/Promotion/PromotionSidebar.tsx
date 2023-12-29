import  { FC } from 'react';
import PromotionSidebarUI from '../../../ui/SidebarPromotionUI';

interface PromotionSidebarProps {
  openAddModal: () => void | undefined;
}
const PromotionSidebar: FC<PromotionSidebarProps> = ({
  openAddModal
}) => {
  const promoSidebar = { 
    title: 'Акции',
    links: [
      {
        id: 1,
        href: '/promotions/carousel',
        name: 'Акции в карусели',
      },
      {
        id: 2,
        href: '/promotions/nocarousel',
        name: 'Акции вне карусели',
      },
    ],
  };

  return (
    <div>
      <PromotionSidebarUI links={promoSidebar.links} title={promoSidebar.title} openAddModal={openAddModal} />
    </div>
  );
};

export default PromotionSidebar;
