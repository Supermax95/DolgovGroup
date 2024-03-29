import React, { FC, useState } from 'react';
import Button from './Button';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import {
  PencilSquareIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface ITable {
  title?: string;
  columnsDefaultName: { name: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[] | undefined;
  columnsListDb: string[];
  currentPage?: number | undefined;
  itemsPerPage?: number | undefined;
  childrenSearch?: React.ReactNode;
  childrenFilter?: React.ReactNode;
  onAddClick?: (() => void) | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditClick?: (item: any) => void | undefined;
  onOneTimePassword?: (item: number) => Promise<void> | undefined;
  renderCell?: () => void;
  currentManagerId?: number | undefined;
}

const Table: FC<ITable> = ({
  title,
  columnsDefaultName,
  columnsListDb,
  data,
  currentPage,
  itemsPerPage,
  childrenSearch,
  childrenFilter,
  onAddClick,
  onEditClick,
  onOneTimePassword,
  currentManagerId,
}) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const filteredData = data
    ? data.filter((item) => item.id !== currentManagerId)
    : [];

  return (
    <div className="max-w-screen-lg">
      <h1 className="text-xl text-lime-600 font-medium mb-4 text-center">
        {title}
      </h1>
      <div className="mb-2">
        <div className="flex items-center justify-between">
          {childrenSearch}
        </div>
      </div>
      {childrenFilter}

      <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-4">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                {title === 'Список контактов' ? (
                  <></>
                ) : (
                  <th className="w-16 pl-6 py-3 text-center border-b-2 border-orange-300 leading-4 text-slate-700 text-sm font-bold ">
                    {title === 'Список сотрудников' ||
                    title === 'Список покупателей' ? (
                      <div className="flex justify-center items-center rounded-lg">
                        <UserGroupIcon className="h-5 w-5 text-slate-600" />
                      </div>
                    ) : title === 'Список магазинов' ||
                      title === 'Список маркетологов' ||
                      onAddClick ? (
                      <div className="flex justify-center items-center rounded-lg">
                        <PlusCircleIcon
                          onClick={onAddClick}
                          className="h-5 w-5 cursor-pointer text-slate-600 hover:text-orange-400"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </th>
                )}
                <th className="w-16 pl-6 py-3 text-center border-b-2 border-orange-300 leading-4 text-slate-700 text-sm font-medium ">
                  №
                </th>

                {columnsDefaultName.map((columnDefaultName, index) => (
                  <th
                    key={index + columnDefaultName.name}
                    className="w-40 px-6 py-3 text-center border-b-2 border-orange-300 leading-4 text-slate-700 text-sm font-medium tracking-wider"
                  >
                    {columnDefaultName.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredData &&
                filteredData.map((item, rowIndex) => (
                  <tr key={item.id}>
                    {title === 'Список контактов' ? (
                      <></>
                    ) : (
                      <td className="w-16 text-center pl-6 py-0 whitespace-no-wrap border-b-2 border-slate-300 text-slate-600 text-sm font-normal">
                        {onEditClick && (
                          <div className="flex justify-center items-center rounded-lg">
                            <PencilSquareIcon
                              className="h-5 w-5 cursor-pointer text-slate-600 hover:text-orange-400"
                              onClick={() => onEditClick?.(item)}
                            />
                          </div>
                        )}
                      </td>
                    )}

                    <td className=" w-24 text-center pl-6 py-0 whitespace-no-wrap border-b-2 border-slate-300 text-slate-600 text-sm font-normal">
                      <div>
                        {(currentPage
                          ? (currentPage - 1) * (itemsPerPage ?? 1)
                          : 0) +
                          rowIndex +
                          1}
                      </div>
                    </td>

                    {columnsListDb.slice(1).map((columnName, colIndex) => (
                      <td
                        key={columnName}
                        className="px-6 py-3 text-center whitespace-no-wrap border-b-2 border-slate-300 text-slate-600 text-sm font-normal relative"
                        onMouseEnter={() =>
                          setHoveredCell(
                            rowIndex * columnsListDb.length + colIndex
                          )
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div>
                          {columnName === 'isActivated' ? (
                            item[columnName] ? (
                              <span className="flex justify-center">
                                <CheckCircleIcon
                                  className="h-8 w-8 text-lime-600"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : (
                              <span className="flex justify-center">
                                <XCircleIcon
                                  className="h-8 w-8 text-orange-400"
                                  aria-hidden="true"
                                />
                              </span>
                            )
                          ) : columnName === 'invisible' ? (
                            item[columnName] ? (
                              <span className="flex justify-center">
                                <XCircleIcon
                                  className="h-8 w-8 text-slate-400"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : (
                              <span className="flex justify-center">
                                <CheckCircleIcon
                                  className="h-8 w-8 text-lime-600"
                                  aria-hidden="true"
                                />
                              </span>
                            )
                          ) : columnName === 'isAdmin' ? (
                            item[columnName] ? (
                              <span className="flex justify-center">
                                <p className="text-sky-400"> Администатор</p>
                              </span>
                            ) : (
                              <span className="flex justify-center">
                                <p className="text-lime-500"> Маркетолог</p>
                              </span>
                            )
                          ) : (
                            <>
                              {[
                                'lastName',
                                'firstName',
                                'middleName',
                                'email',
                              ].includes(columnName) && (
                                <>
                                  {item[columnName].length > 15 && (
                                    <div
                                      className={`absolute z-10 p-2 bg-white border rounded shadow ${
                                        hoveredCell ===
                                        rowIndex * columnsListDb.length +
                                          colIndex
                                          ? ''
                                          : 'hidden'
                                      }`}
                                    >
                                      {item[columnName]}
                                    </div>
                                  )}
                                  {item[columnName].length > 15
                                    ? `${item[columnName].substring(0, 15)}...`
                                    : item[columnName]}
                                </>
                              )}
                              {![
                                'lastName',
                                'firstName',
                                'middleName',
                                'email',
                              ].includes(columnName) && <>{item[columnName]}</>}
                            </>
                          )}
                        </div>
                      </td>
                    ))}

                    {onOneTimePassword && (
                      <td className="px-2 py-3 whitespace-no-wrap text-right border-b-2 border-slate-300">
                        <Button
                          type="button"
                          onClick={() => onOneTimePassword(item.id)}
                          styleCSSButton={
                            'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-slate-700 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 hover:text-white'
                          }
                          styleCSSSpan={
                            'w-44 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                          }
                          title="Отправить пароль"
                        />
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {columnsListDb.length === 0 ||
          (filteredData.length === 0 && (
            <div className="flex items-center justify-center mt-4">
              <span className="text-slate-600 text-sm font-normal">
                Данные в таблице отсутствуют
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Table;
