import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ISidebarProfileArray {
  id: number;
  href: string;
  name: string;
  childrenIcon: React.ReactNode;
}

interface IRoleData {
  avatar: React.ReactNode;
  personalData: {
    firstName: string | undefined;
    lastName: string | undefined;
  };
  links: ISidebarProfileArray[];
}

export interface ISidebarProfile {
  userRoles: IRoleData;
}

const SidebarProfile: FC<ISidebarProfile> = ({ userRoles }) => {
  const { avatar, personalData, links } = userRoles;

  return (
    <div className="h-full w-60 border-r-2 border-orange-300">
      <div className="h-16 border-b-2 border-orange-300">
        <div className="flex items-center p-3 space-x-4">
          <div>{avatar}</div>
          <div>
            <h2 className="text-sm font-normal text-slate-600">
              {personalData.firstName} {personalData.lastName}
            </h2>
          </div>
        </div>
        <div className="h-full w-60 border-r-2 border-orange-300">
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className="h-full w-60 border-r-2 border-orange-300">
              {links.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-100 "
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
    </div>
  );
};

export default SidebarProfile;
