import { useState, useMemo, useEffect } from "react";
import { Employee } from "../store/Store";

function usePagination(data: Employee[]) {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dataForCurrentPage = data.slice(startIndex, endIndex);

  const firstItemIndex = startIndex + 1;
  const lastItemIndex = Math.min(endIndex, data.length);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    dataForCurrentPage,
    firstItemIndex,
    lastItemIndex,
    goToNextPage,
    goToPrevPage,
  };
}

export default usePagination;
