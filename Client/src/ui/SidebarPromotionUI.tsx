import { PlusCircleIcon } from '@heroicons/react/24/outline';
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
  openAddModal: () => void | undefined;
}

const PromotionSidebarUI: FC<IPromotionsSidebar> = ({
  links,
  title,
  openAddModal,
}) => {
  return (
    <div className="flex flex-col w-56 bg-white h-full border-r-2 border-orange-300">
      <div className="h-16 flex items-center justify-center border-b-2 border-orange-300 text-center">
        <h2 className="text-xl text-slate-600 font-medium">{title}</h2>
      </div>
      <ul className="py-0">
        <div
          onClick={openAddModal}
          className="cursor-pointer flex items-center p-2 justify-between rounded-md hover:bg-slate-100"
        >
          <div className="flex items-center justify-center ml-6">
            <span className="text-lime-600 text-sm font-medium">
              Новая акция
            </span>
          </div>
          <div className="flex items-center ml-auto">
            <PlusCircleIcon className="cursor-pointer w-5 h-5 text-lime-600" />
          </div>
        </div>
        {links.map((item) => (
          <li key={item.id} className="flex items-center">
            <Link
              to={item.href}
              className="flex items-center p-2 rounded-md hover:bg-slate-100"
            >
              <div className="cursor-pointer w-48 flex items-center space-x-6 text-slate-600">
                {item.name === 'Акции в карусели' ? (
                  <div className="rounded-full py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 30 30"
                      width="20"
                    >
                      <path d="M19.5 9c-.492-.004-.916.242-1.092.47l-2.737 3.457c-.17.208-.55.073-.727-.03l-2.455-1.547c-.29-.19-.62-.35-.988-.35-.38 0-.786.114-1.072.434l-3.293 3.724c-.445.498.3 1.166.746.668l3.294-3.724c.218-.234.535-.05.765.084l2.46 1.552.012.006c.306.19.65.252.988.256.34.004.71-.027.985-.36l2.767-3.5c.217-.263.534-.14.744.04l2.254 1.688c.527.477 1.205-.375.62-.78l-2.252-1.69C20.252 9.188 19.913 9 19.5 9zm-12 8h15c.277 0 .5.223.5.5s-.223.5-.5.5h-15c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zM11 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 1c.558 0 1 .442 1 1s-.442 1-1 1-1-.442-1-1 .442-1 1-1zm14 19.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm-19 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm9-1.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 1c.563 0 1 .437 1 1s-.437 1-1 1-1-.437-1-1 .437-1 1-1zM26.5 3c-.665 0-.648 1 0 1h2c.286 0 .5.214.5.5v14c0 .286-.214.5-.5.5h-2c-.654 0-.66 1 0 1h2c.822 0 1.5-.678 1.5-1.5v-14c0-.822-.678-1.5-1.5-1.5zm-25 0C.678 3 0 3.678 0 4.5v14c0 .822.678 1.5 1.5 1.5h2c.66 0 .665-1 0-1h-2c-.286 0-.5-.214-.5-.5v-14c0-.286.214-.5.5-.5h2c.66 0 .66-1 0-1zm5-1C5.678 2 5 2.678 5 3.5v16c0 .822.678 1.5 1.5 1.5h17c.822 0 1.5-.678 1.5-1.5v-16c0-.822-.678-1.5-1.5-1.5zm0 1h17c.286 0 .5.214.5.5v16c0 .286-.214.5-.5.5h-17c-.286 0-.5-.214-.5-.5v-16c0-.286.214-.5.5-.5z" />
                    </svg>
                  </div>
                ) : (
                  <div className="rounded-full py-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m19.5,8c-0.49,0 -0.92,0.24 -1.09,0.47l-2.74,3.46c-0.17,0.2 -0.55,0.07 -0.73,-0.03l-2.45,-1.55c-0.29,-0.19 -0.62,-0.35 -0.99,-0.35c-0.38,0 -0.78,0.11 -1.07,0.43l-3.29,3.73c-0.45,0.5 0.3,1.16 0.74,0.67l3.3,-3.73c0.21,-0.23 0.53,-0.05 0.76,0.09l2.46,1.55l0.01,0c0.31,0.19 0.65,0.26 0.99,0.26c0.34,0 0.71,-0.03 0.99,-0.36l2.76,-3.5c0.22,-0.26 0.54,-0.14 0.75,0.04l2.25,1.69c0.53,0.47 1.21,-0.38 0.62,-0.78l-2.25,-1.69c-0.27,-0.21 -0.61,-0.4 -1.02,-0.4zm-12,8l15,0c0.28,0 0.5,0.22 0.5,0.5s-0.22,0.5 -0.5,0.5l-15,0c-0.28,0 -0.5,-0.22 -0.5,-0.5s0.22,-0.5 0.5,-0.5zm3.5,-12c-1.1,0 -2,0.9 -2,2s0.9,2 2,2s2,-0.9 2,-2s-0.9,-2 -2,-2zm0,1c0.56,0 1,0.44 1,1s-0.44,1 -1,1s-1,-0.44 -1,-1s0.44,-1 1,-1zm15.5,-2l0,15l0,-15zm-20,-2c-0.82,0 -1.5,0.68 -1.5,1.5l0,16c0,0.82 0.68,1.5 1.5,1.5l17,0c0.82,0 1.5,-0.68 1.5,-1.5l0,-16c0,-0.82 -0.68,-1.5 -1.5,-1.5l-17,0zm0,1l17,0c0.29,0 0.5,0.21 0.5,0.5l0,16c0,0.29 -0.21,0.5 -0.5,0.5l-17,0c-0.29,0 -0.5,-0.21 -0.5,-0.5l0,-16c0,-0.29 0.21,-0.5 0.5,-0.5z"
                        id="svg_1"
                      />
                    </svg>
                  </div>
                )}

                <span className="text-slate-600 text-sm font-normal">
                  {item.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionSidebarUI;
