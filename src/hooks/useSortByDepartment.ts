import { useState, useMemo } from "react";
import useEmployeeStore from "../components/Store";

const useSortByDepartment = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const [isAscending, setIsAscending] = useState(true);

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      if (isAscending) {
        return a.department.localeCompare(b.department);
      } else {
        return b.department.localeCompare(a.department);
      }
    });
  }, [employees, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return { sortedEmployees, isAscending, toggleSortOrder };
};

export default useSortByDepartment;
