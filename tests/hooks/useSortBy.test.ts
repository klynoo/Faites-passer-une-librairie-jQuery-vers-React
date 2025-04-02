// import { renderHook, act } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import useSortBy from "../../src/hooks/useSortBy";
// import { Employee } from "../../src/store/Store";

// const mockEmployees: Employee[] = [
//   {
//     firstName: "Alice",
//     lastName: "Johnson",
//     startDate: "2019-03-10",
//     department: "HR",
//     dateOfBirth: "1985-12-01",
//     street: "789 Boulevard",
//     city: "Berlin",
//     state: "DE",
//     zipCode: "10115",
//   },
//   {
//     firstName: "John",
//     lastName: "Doe",
//     startDate: "2020-01-01",
//     department: "Marketing",
//     dateOfBirth: "1989-05-15",
//     street: "123 Main St",
//     city: "Paris",
//     state: "FR",
//     zipCode: "75000",
//   },
//   {
//     firstName: "Jane",
//     lastName: "Smith",
//     startDate: "2021-06-15",
//     department: "Sales",
//     dateOfBirth: "1990-08-20",
//     street: "456 Another Rd",
//     city: "London",
//     state: "UK",
//     zipCode: "SW1A",
//   },
// ];

// describe("Hook de tri de données", () => {
//   it("Par défaut ne trie pas la liste", () => {
//     const { result } = renderHook(() => useSortBy(mockEmployees));
//     const { sortedEmployees } = result.current;

//     expect(sortedEmployees.map((emp) => emp.city)).toEqual([
//       "Berlin",
//       "Paris",
//       "London",
//     ]);
//   });

//   it("Doit trier la liste de manière ascendante sur une des colonnes", () => {
//     const { result } = renderHook(() => useSortBy(mockEmployees));
//     const { toggleSort } = result.current;

//     act(() => {
//       toggleSort("city");
//     });

//     const { sortedEmployees } = result.current;
//     expect(sortedEmployees.map((emp) => emp.city)).toEqual([
//       "Berlin",
//       "London",
//       "Paris",
//     ]);
//   });
// });
