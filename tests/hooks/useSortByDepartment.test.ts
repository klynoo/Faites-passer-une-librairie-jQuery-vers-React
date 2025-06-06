// import { renderHook, act } from "@testing-library/react";
// import { describe, it, expect } from "vitest";
// import useSortBy from "../../src/hooks/useSortBy";
// import { Employee } from "../../src/store/Store";

// const mockEmployees: Employee[] = [
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
//     zipCode: "84000",
//   },
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
// ];

// describe("useSortByDepartment", () => {
//   it("tri par department en ordre ascendant", () => {
//     const { result } = renderHook(() => useSortBy(mockEmployees));

//     act(() => {
//       result.current.toggleSort("department");
//     });

//     const { sortedEmployees } = result.current;
//     expect(sortedEmployees.map((emp) => emp.department)).toEqual([
//       "HR",
//       "Marketing",
//       "Sales",
//     ]);
//   });

//   it("passe en ordre descendant après toggleSort sur 'department'", () => {
//     const { result } = renderHook(() => useSortBy(mockEmployees));

//     act(() => {
//       result.current.toggleSort("department");
//     });
//     act(() => {
//       result.current.toggleSort("department");
//     });

//     const { sortedEmployees } = result.current;
//     expect(sortedEmployees.map((emp) => emp.department)).toEqual([
//       "Sales",
//       "Marketing",
//       "HR",
//     ]);
//   });
// });
