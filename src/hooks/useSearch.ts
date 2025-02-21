import { useState, useMemo } from "react";

function useSearch(employees: any[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employees;

    const lowerSearch = searchTerm.toLowerCase();
    return employees.filter((emp) =>
      [emp.firstName, emp.lastName, emp.city, emp.state, emp.department]
        .map((field) => field.toLowerCase())
        .some((value) => value.includes(lowerSearch))
    );
  }, [employees, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredEmployees,
  };
}

export default useSearch;
