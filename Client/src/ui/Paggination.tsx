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
    <div className="flex space-x-2 mt-4">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded ${
            page === currentPage
              ? 'bg-gradient-to-br from-teal-300 to-lime-300  text-white'
              : 'bg-white text-lime-600 hover:bg-lime-200'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
