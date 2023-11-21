import { FC } from 'react';
import Button from './Button';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

interface ITable {
  title: string;
  columnsDefaultName: { name: string }[];
  data?: any[] | undefined;
  columnsListDb: string[];
  currentPage?: number | undefined;
  itemsPerPage?: number | undefined;
  childrenSearch?: React.ReactNode;
  onAddClick?: (() => void) | undefined;
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
  onAddClick,
  onEditClick,
  onOneTimePassword,
  currentManagerId,
}) => {
  //* проверяет текущего менеджера, чтобы тот не видел себя в таблице
  const filteredData = data
    ? data.filter((item) => item.id !== currentManagerId)
    : [];

  return (
    <div>
      <h1 className="text-xl text-lime-600 font-medium mb-4">{title}</h1>
      <div className="flex justify-between">
        {childrenSearch}
        {onAddClick ? (
          <Button
            type="button"
            onClick={onAddClick}
            styleCSSSpan={
              'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
            }
            title="Добавить"
          />
        ) : null}
      </div>

      <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-4">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="w-16 pl-6 py-3   text-center   border-b-2 border-orange-300 leading-4 text-slate-700 text-sm font-bold ">
                  №
                </th>
                {columnsDefaultName.map((columnDefaultName, index) => (
                  <th
                    key={index + columnDefaultName.name}
                    className="w-40 px-6 py-3   text-center   border-b-2 border-orange-300 leading-4 text-slate-700 text-sm font-bold tracking-wider"
                  >
                    {columnDefaultName.name}
                  </th>
                ))}
                <th className="w-36 border-b-2 border-orange-300"></th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredData &&
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="w-16  text-center   pl-6 py-0 whitespace-no-wrap border-b-2 border-slate-300 text-slate-600 text-sm font-normal">
                      {/* {(currentPage - 1) * itemsPerPage + index + 1} 
                                            //! этот код надо проверить 
                                            */}
                      {(currentPage
                        ? (currentPage - 1) * (itemsPerPage ?? 1)
                        : 0) +
                        index +
                        1}
                    </td>
                    {columnsListDb.slice(1).map((columnName) => (
                      <td
                        key={columnName}
                        className="px-6 py-3 text-center whitespace-no-wrap border-b-2 border-slate-300 text-slate-600 text-sm font-normal"
                      >
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
                          item[columnName]
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-3 whitespace-no-wrap text-right border-b-2 border-slate-300">
                      <div className="flex items-center">
                        {onEditClick && (
                          <div>
                            <Button
                              type="button"
                              onClick={() => onEditClick?.(item)}
                              styleCSSButton={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 hover:text-white`}
                              title="Редактировать"
                            />
                          </div>
                        )}
                        {onOneTimePassword ? (
                          <div>
                            <Button
                              type="button"
                              onClick={() => onOneTimePassword(item.id)}
                              styleCSSSpan={
                                'w-44 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                              }
                              title="Отправить пароль"
                            />
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
