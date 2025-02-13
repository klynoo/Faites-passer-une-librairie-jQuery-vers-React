import { useState, useMemo } from "react";
import { Employee } from "../components/Store";

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
  const [sortByField, setSortByField] = useState<keyof Employee | null>(null);

  // Tri mémorisé : uniquement sur le tableau qu'on nous a passé
  const sortedEmployees = useMemo(() => {
    if (!sortByField) return employees;

    let compareStrategy: "string" | "date" | "number" = "string";
    if (["startDate", "birthDate", "dateOfBirth"].includes(sortByField)) {
      compareStrategy = "date";
    } else if (sortByField === "zipCode") {
      compareStrategy = "number";
    }

    return [...employees].sort(
      compareFunctions[compareStrategy](sortByField, isAscending)
    );
  }, [employees, isAscending, sortByField]);

  /**
   * Toggle : si on reclique sur la même colonne, on inverse l'ordre (ASC <-> DESC).
   * Sinon, on set un nouveau champ de tri et on repasse en ascendant.
   */
  const toggleSort = (field: keyof Employee) => {
    if (field === sortByField) {
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
    sortByField,
  };
}
