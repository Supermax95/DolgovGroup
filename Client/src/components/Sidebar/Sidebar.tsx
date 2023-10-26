import React from 'react';

interface SidebarProps {
  menuItems: { label: string }[];
  onMenuItemClick: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onMenuItemClick }) => {
  return (
    <div className="flex flex-col w-64 bg-white h-full border-r">
      <div className="h-16 flex items-center justify-center border-b">
        <div className="text-xl font-bold">Sidebar</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="py-4 space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className="flex items-center w-full h-12 px-4 text-gray-700 hover:text-indigo-500 focus:outline-none focus:bg-gray-100"
                onClick={() => onMenuItemClick(item.label)}
              >
                <span className="mr-4"></span>
                <span className="text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;