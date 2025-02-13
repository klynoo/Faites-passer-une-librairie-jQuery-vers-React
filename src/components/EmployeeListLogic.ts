import { useState, useMemo } from "react";
import useEmployeeStore, { Employee } from "./Store";
import useSortBy from "../hooks/useSortBy";

export type SortCriteria = keyof Employee | null;

const ITEMS_PER_PAGE = 5;

const useEmployeeListLogic = () => {
  const employeesFromStore = useEmployeeStore((state) => state.employees);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employeesFromStore;

    return employeesFromStore.filter((emp) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        emp.firstName.toLowerCase().includes(lowerSearch) ||
        emp.lastName.toLowerCase().includes(lowerSearch) ||
        emp.city.toLowerCase().includes(lowerSearch) ||
        emp.state.toLowerCase().includes(lowerSearch) ||
        emp.department.toLowerCase().includes(lowerSearch)
      );
    });
  }, [employeesFromStore, searchTerm]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  }, [filteredEmployees]);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const employeesForCurrentPage = filteredEmployees.slice(startIndex, endIndex);

  const { sortedEmployees, toggleSort } = useSortBy(employeesForCurrentPage);

  const [currentSort, setCurrentSort] = useState<SortCriteria>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (sortBy: SortCriteria) => {
    if (sortBy === currentSort) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setCurrentSort(sortBy);
      setSortOrder("asc");
    }
    if (sortBy) {
      toggleSort(sortBy);
    }
  };

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
    employees: sortedEmployees,

    searchTerm,
    setSearchTerm,

    currentSort,
    sortOrder,
    handleSortChange,

    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
  };
};

export default useEmployeeListLogic;
