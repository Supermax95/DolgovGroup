// import React, { FC } from 'react';
// import Button from './Button';

// interface ITable {
//   nameTable: string;
//   columnsName: any[];
//   childrenButtonAdd: React.ReactNode;
//   data: any[];
//   columns: any[];
//   childrenButtonEdit?: React.ReactNode;
// }

// const Table: FC<ITable> = ({
//   nameTable,
//   columnsName,
//   childrenButtonAdd,
//   data,
//   columns,
//   childrenButtonEdit,
// }) => {
//   return (
//     <div>
//       <h1 className="text-xl text-lime-600 font-medium mb-4">{nameTable}</h1>
//       <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
//         <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 {columnsName.map((columnName) => (
//                   <th
//                     key={columnName}
//                     className="w-40 px-6 py-3 border-b-2 border-orange-300 text-left leading-4 text-slate-700 text-sm font-bold tracking-wider"
//                   >
//                     {columnName}
//                   </th>
//                 ))}
//                 <th className=" border-b-2 border-orange-300">
//                   {childrenButtonAdd}
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="bg-white">
//               {data.map((value, index) => (
//                 <tr key={value}>
//                   <td className="text-center border-b border-slate-400 text-slate-600 text-sm font-normal">
//                     {index + 1}
//                   </td>
//                   {columns.slice(1).map((columnName) => (
//                     <td
//                       key={columnName}
//                       className="px-6 py-4 whitespace-no-wrap border-b border-slate-400 text-slate-600 text-sm font-normal"
//                     >
//                       {value[columnName]}
//                     </td>
//                   ))}
//                   <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-slate-400">
//                     {/* <Button
//                       type="button"
//                       onClick={() => onEditClick(value)}
//                       styleCSSButton={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200`}
//                       title="Редактировать"
//                     /> */}
//                     {childrenButtonEdit}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table;
import React, { FC } from 'react';
import Button from './Button';

interface ITable {
  nameTable: string;
  columns: { columnName: string }[];
  data: any[];
  columnsToShow: string[];
  onAddClick: () => void;
  onEditClick: (item: any) => void;
}

const Table: FC<ITable> = ({
  nameTable,
  columns,
  columnsToShow,
  data,
  onAddClick,
  onEditClick,
}) => {
  return (
    <div>
      <h1 className="text-xl text-lime-600 font-medium mb-4">{nameTable}</h1>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index + column.columnName}
                    className="w-40 px-6 py-3 border-b-2 border-orange-300 text-left leading-4 text-slate-700 text-sm font-bold tracking-wider"
                  >
                    {column.columnName}
                  </th>
                ))}
                <th className="w-36 border-b-2 border-orange-300">
                  <Button
                    type="button"
                    onClick={onAddClick}
                    styleCSSSpan={
                      'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'
                    }
                    title="Добавить"
                  />
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center border-b border-slate-400 text-slate-600 text-sm font-normal">
                    {index + 1}
                  </td>
                  {columnsToShow.slice(1).map((columnName) => (
                    <td
                      key={columnName}
                      className="px-6 py-4 whitespace-no-wrap border-b border-slate-400 text-slate-600 text-sm font-normal"
                    >
                      {item[columnName]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-slate-400">
                    <Button
                      type="button"
                      onClick={() => onEditClick(item)}
                      styleCSSButton={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-normal text-slate-600 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200`}
                      title="Редактировать"
                    />
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
