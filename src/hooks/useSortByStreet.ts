import { useState, useMemo } from "react";
import useEmployeeStore from "../components/Store";

const useSortByStreet = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const [isAscending, setIsAscending] = useState(true);

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      return isAscending
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street);
    });
  }, [employees, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return { sortedEmployees, toggleSortOrder };
};

export default useSortByStreet;
