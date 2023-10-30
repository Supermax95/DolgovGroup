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
  const itemsPerPage = 6; 
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxIndex = Math.min(totalPages, itemsPerPage);
  const startIndex = Math.max(1, currentPage - Math.floor(itemsPerPage / 2));

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="flex items-center space-x-1 font-light my-4 justify-center">
      {currentPage > 1 && (
        <li>
          <a
            onClick={handlePrevPage}
            className="border border-slate-300 rounded-full text-slate-500 hover:bg-slate-200 hover:border-slate-200 bg-white w-8 h-8 flex items-center justify-center"
          >
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
      )}

      {startIndex > 1 && (
        <li>
          <a
            onClick={() => onPageChange(1)}
            className="border border-slate-300 rounded-full bg-white w-8 h-8 flex items-center justify-center"
          >
            1
          </a>
        </li>
      )}

      {startIndex > 2 && (
        <li>
          <span className="border border-slate-300 rounded-full bg-white w-8 h-8 flex items-center justify-center">
            ...
          </span>
        </li>
      )}

      {pageNumbers.slice(startIndex - 1, startIndex + maxIndex - 1).map((page) => (
        <li
          key={page}
          onClick={() => onPageChange(page)}
          className={`border border-slate-300 rounded-full ${
            page === currentPage
              ? 'bg-slate-300 text-white'
              : 'bg-white text-slate-500 hover-bg-slate-300'
          }`}
        >
          <a className="w-8 h-8 flex items-center justify-center">{page}</a>
        </li>
      ))}

      {startIndex + maxIndex <= totalPages && (
        <li>
          <span className="border border-slate-300 rounded-full bg-white w-8 h-8 flex items-center justify-center">
            ...
          </span>
        </li>
      )}

      {startIndex + maxIndex < totalPages && (
        <li>
          <a
            onClick={() => onPageChange(totalPages)}
            className="border border-slate-300 rounded-full bg-white w-8 h-8 flex items-center justify-center"
          >
            {totalPages}
          </a>
        </li>
      )}

      {currentPage < totalPages && (
        <li>
          <a
            onClick={handleNextPage}
            className="border border-slate-300 rounded-full text-slate-500 hover:bg-slate-200 hover:border-slate-200 bg-white w-8 h-8 flex items-center justify-center"
          >
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
      )}
    </ul>
  );
};

export default Pagination;
