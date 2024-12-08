import { useState } from 'react';

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  return {
    currentItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
  };
};
