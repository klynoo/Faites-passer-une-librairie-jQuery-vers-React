import usePagination from "../hooks/usePagination";
import useSearch from "../hooks/useSearch";
import useSortBy from "../hooks/useSortBy";
import useEmployeeStore from "./Store";

function useEmployeeListLogic() {
  const employeesFromStore = useEmployeeStore((state) => state.employees);

  const { searchTerm, setSearchTerm, filteredEmployees } =
    useSearch(employeesFromStore);

  const {
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
  } = usePagination(filteredEmployees);

  const { currentSort, sortedEmployees, toggleSort, isAscending } =
    useSortBy(dataForCurrentPage);

  return {
    employees: sortedEmployees,

    totalEmployees: filteredEmployees.length,
    firstItemIndex,
    lastItemIndex,

    searchTerm,
    setSearchTerm,

    currentSort,
    sortOrder: isAscending ? "asc" : "desc",
    handleSortChange: toggleSort,

    itemsPerPage,
    setItemsPerPage,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
  } as const;
}

export default useEmployeeListLogic;
