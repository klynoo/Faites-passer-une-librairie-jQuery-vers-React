import { useState, useMemo } from "react";
import useEmployeeStore from "../components/Store";

const useSortByLastName = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const [isAscending, setIsAscending] = useState(true);

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      if (isAscending) {
        return a.lastName.localeCompare(b.lastName);
      } else {
        return b.lastName.localeCompare(a.lastName);
      }
    });
  }, [employees, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return { sortedEmployees, isAscending, toggleSortOrder };
};

export default useSortByLastName;
