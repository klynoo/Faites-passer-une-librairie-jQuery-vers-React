import { useState, useMemo } from "react";
import useEmployeeStore from "../components/Store";

const useSortByState = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const [isAscending, setIsAscending] = useState(true);

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      return isAscending
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state);
    });
  }, [employees, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return { sortedEmployees, toggleSortOrder };
};

export default useSortByState;
