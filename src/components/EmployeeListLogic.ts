import { useState, useMemo } from "react";
import useEmployeeStore, { Employee } from "./Store";
import useSortBy from "../hooks/useSortBy";

export type SortCriteria = keyof Employee | null;

const ITEMS_PER_PAGE = 5;

const useEmployeeListLogic = () => {
  // 1) Récupère tous les employés depuis le store
  const employeesFromStore = useEmployeeStore((state) => state.employees);

  // 2) Recherche (texte saisi)
  const [searchTerm, setSearchTerm] = useState("");

  // Filtre les employés sur la base de searchTerm (sur tous les champs que tu veux)
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employeesFromStore;

    return employeesFromStore.filter((emp) => {
      // Exemple simple : on check dans firstName + lastName + city...
      // (Personnalise selon tes besoins)
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

  // 3) Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul du nombre total de pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  }, [filteredEmployees]);

  // Empêche currentPage de déborder quand on tape un nouveau searchTerm
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  // On récupère les 5 employés de la page actuelle
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const employeesForCurrentPage = filteredEmployees.slice(startIndex, endIndex);

  // 4) Tri uniquement sur ces 5 employés
  //    => on appelle notre hook "useSortBy" en lui passant employeesForCurrentPage
  const { sortedEmployees, toggleSort } = useSortBy(employeesForCurrentPage);

  // Pour l’UI, on conserve quand même un "currentSort" et un "sortOrder",
  // mais c'est "useSortBy" qui fait le vrai tri interne.
  const [currentSort, setCurrentSort] = useState<SortCriteria>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Quand on clique sur un en-tête de tri
  const handleSortChange = (sortBy: SortCriteria) => {
    // Gestion basique de l'ordre ASC / DESC
    if (sortBy === currentSort) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setCurrentSort(sortBy);
      setSortOrder("asc");
    }
    // Appelle la fonction toggleSort du hook
    if (sortBy) {
      toggleSort(sortBy);
    }
  };

  // 5) Contrôles de pagination
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
    // Le tableau final à afficher (trié et paginé)
    employees: sortedEmployees,

    // Recherche
    searchTerm,
    setSearchTerm,

    // Tri
    currentSort,
    sortOrder,
    handleSortChange,

    // Pagination
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setCurrentPage, // si tu veux un accès direct
  };
};

export default useEmployeeListLogic;
