import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ISidebarProfile {
  avatar: React.ReactNode;
  firstName: string | undefined;
  lastName: string | undefined;
  sidebarProfile: ISidebarProfileArray[];
}

interface ISidebarProfileArray {
  id: number;
  href: string;
  name: string;
  childrenIcon: React.ReactNode;
}

const SidebarProfile: FC<ISidebarProfile> = ({
  avatar,
  firstName,
  lastName,
  sidebarProfile,
}) => {
  return (
    <div className="h-full w-60 border-r-2 border-orange-300">
      <div className="h-16 border-b-2 border-orange-300">
        <div className="flex items-center p-3 space-x-4">
          <div>{avatar}</div>
          <div>
            <h2 className="text-sm forn-normal text-slate-600">
              {firstName} {lastName}
            </h2>
          </div>
        </div>
        <div className="h-full w-60 border-r-2 border-orange-300">
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className="h-full w-60 border-r-2 border-orange-300">
              {sidebarProfile.map((item) => (
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
