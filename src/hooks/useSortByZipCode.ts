import { useState, useMemo } from "react";
import useEmployeeStore from "../components/Store";

const useSortByZipCode = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const [isAscending, setIsAscending] = useState(true);

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      return isAscending
        ? parseInt(a.zipCode) - parseInt(b.zipCode)
        : parseInt(b.zipCode) - parseInt(a.zipCode);
    });
  }, [employees, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return { sortedEmployees, toggleSortOrder };
};

export default useSortByZipCode;
