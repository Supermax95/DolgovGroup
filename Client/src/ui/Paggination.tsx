import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {/* <div className="flex space-x-2 mt-4">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-full ${
              page === currentPage
                ? 'bg-gradient-to-br from-teal-300 to-lime-300  text-white'
                : 'bg-white text-lime-600 hover:bg-lime-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div> */}
      <ul className="flex items-center space-x-1 font-light my-4 justify-center">
        <li className="border border-slate-300 rounded-full text-slate-500 hover:bg-slate-200 hover:border-slate-200 bg-white">
          <a href="#" className="w-8 h-8 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </a>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            //  className="border border-slate-300 rounded-full text-slate-500 hover:bg-slate-200 hover:border-slate-200 bg-white"
            className={`border border-slate-300 rounded-full ${
              page === currentPage
                ? // 'bg-gradient-to-br from-teal-300 to-lime-300  text-white'
                  'bg-slate-300 text-white'
                : //: 'bg-white text-slate-500 hover:bg-gradient-to-br from-teal-300 to-lime-300 '
                  'bg-white text-slate-500 hover:bg-slate-300 '
            }`}
          >
            <a className="w-8 h-8 flex items-center justify-center">{page}</a>
          </li>
        ))}
        <li className="border border-slate-300 rounded-full text-slate-500 hover:bg-slate-200 hover:border-slate-200 bg-white">
          <a href="#" className="w-8 h-8 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
