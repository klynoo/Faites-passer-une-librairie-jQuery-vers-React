import { useState, useMemo } from "react";
import { Employee } from "../components/Store";

export type SortCriteria = keyof Employee;

const compareFunctions = {
  string: function (field: keyof Employee, isAscending: boolean) {
    return function (a: Employee, b: Employee) {
      return isAscending
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    };
  },
  date: function (field: keyof Employee, isAscending: boolean) {
    return function (a: Employee, b: Employee) {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    };
  },
  number: function (field: keyof Employee, isAscending: boolean) {
    return function (a: Employee, b: Employee) {
      return isAscending
        ? parseInt(a[field]) - parseInt(b[field])
        : parseInt(b[field]) - parseInt(a[field]);
    };
  },
};

/**
 * Hook générique qui gère le tri sur n'importe quel champ,
 * en ne triant QUE la liste qu'on lui passe en paramètre.
 */
export default function useSortBy(employees: Employee[]) {
  const [isAscending, setIsAscending] = useState(true);
  const [currentSort, setSortByField] = useState<keyof Employee | null>(null);

  const sortedEmployees = useMemo(() => {
    if (!currentSort) return employees;

    let compareStrategy: "string" | "date" | "number" = "string";
    if (["startDate", "birthDate", "dateOfBirth"].includes(currentSort)) {
      compareStrategy = "date";
    } else if (currentSort === "zipCode") {
      compareStrategy = "number";
    }

    return [...employees].sort(
      compareFunctions[compareStrategy](currentSort, isAscending)
    );
  }, [employees, isAscending, currentSort]);

  const toggleSort = (field: keyof Employee) => {
    if (field === currentSort) {
      setIsAscending((prev) => !prev);
    } else {
      setSortByField(field);
      setIsAscending(true);
    }
  };

  return {
    sortedEmployees,
    toggleSort,
    isAscending,
    currentSort,
  };
}
