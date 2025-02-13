import { useState, useMemo } from "react";
import useEmployeeStore from "../components/Store";

const useSortByStartDate = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const [isAscending, setIsAscending] = useState(true);

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });
  }, [employees, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return { sortedEmployees, isAscending, toggleSortOrder };
};

export default useSortByStartDate;
