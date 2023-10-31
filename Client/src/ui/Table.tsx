import { FC } from 'react';
import Button from './Button';

interface ITable {
  title: string;
  columnsDefaultName: { name: string }[];
  data: any[];
  columnsListDb: string[];
  currentPage: number;
  itemsPerPage: number;
  onAddClick: () => void;
  onEditClick: (item: any) => void;
}

const Table: FC<ITable> = ({
  title,
  columnsDefaultName,
  columnsListDb,
  data,
  currentPage,
  itemsPerPage,
  onAddClick,
  onEditClick,
}) => {
  return (
    <div>
      <h1 className="text-xl text-lime-600 font-medium mb-4">{title}</h1>
      {/* <div className="overflow-x-scroll"> */}
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
                <th className="w-36 border-b-2 border-orange-300">
                  <Button
                    type="button"
                    onClick={onAddClick}
                    styleCSSSpan={
                      'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                    }
                    title="Добавить"
                  />
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="w-16  text-center   pl-6 py-0 whitespace-no-wrap border-b-2 border-slate-300 text-slate-600 text-sm font-normal">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  {columnsListDb.slice(1).map((columnName) => (
                    <td
                      key={columnName}
                      className="px-6 py-3  text-center  whitespace-no-wrap border-b-2 border-slate-300 text-slate-600 text-sm font-normal"
                    >
                      {item[columnName]}
                    </td>
                  ))}
                  <td className="px-6 py-3 whitespace-no-wrap text-right border-b-2 border-slate-300">
                    <Button
                      type="button"
                      onClick={() => onEditClick(item)}
                      styleCSSButton={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 hover:text-white`}
                      title="Редактировать"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Table;
