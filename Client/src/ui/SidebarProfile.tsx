import { FC } from 'react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface ISidebarProfile {
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
  firstName,
  lastName,
  sidebarProfile,
}) => {
  return (
    <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100">
      {/* <div className="flex flex-col w-52 bg-white h-full border-r-2 border-orange-300"> */}
      <div className="h-16  border-b-2 border-slate-300">
        <div className="flex items-center p-2 space-x-4">
          <div>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full dark:bg-gray-600">
              <span className="font-normal text-2xl text-white">A</span>
            </div>
          </div>
          <div>
            <h2 className="text-sm forn-normal text-slate-600">
              {firstName} {lastName}
            </h2>
          </div>
        </div>
        <div className="divide-y ">
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className=" ">
              {sidebarProfile.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-100 "
                >
                  <div>
                    {/* <ListBulletIcon className="w-6 h-6 text-slate-600" /> */}
                    {item.childrenIcon}
                  </div>
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
