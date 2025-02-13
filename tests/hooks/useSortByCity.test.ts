import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useSortBy from "../../src/hooks/useSortBy";
import { Employee } from "../../src/components/Store";

const mockEmployees: Employee[] = [
  {
    firstName: "John",
    lastName: "Doe",
    startDate: "2020-01-01",
    department: "Marketing",
    dateOfBirth: "1989-05-15",
    street: "123 Main St",
    city: "Paris",
    state: "FR",
    zipCode: "75000",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    startDate: "2021-06-15",
    department: "Sales",
    dateOfBirth: "1990-08-20",
    street: "456 Another Rd",
    city: "London",
    state: "UK",
    zipCode: "SW1A",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    startDate: "2019-03-10",
    department: "HR",
    dateOfBirth: "1985-12-01",
    street: "789 Boulevard",
    city: "Berlin",
    state: "DE",
    zipCode: "10115",
  },
];

vi.mock("../../src/components/Store", () => {
  return {
    __esModule: true,
    default: (selector: (state: { employees: Employee[] }) => Employee[]) => {
      const mockState = {
        employees: mockEmployees,
      };
      return selector(mockState);
    },
  };
});

describe("useSortByCity", () => {
  it("devrait trier les employés par ordre croissant par ville par défaut", () => {
    const { result } = renderHook(() => useSortBy());
    const { sortedEmployees } = result.current;

    expect(sortedEmployees.map((emp) => emp.city)).toEqual([
      "Berlin",
      "London",
      "Paris",
    ]);
  });

  it("devrait basculer vers l ordre décroissant après avoir appelé toggleSortOrder", () => {
    const { result } = renderHook(() => useSortBy());
    const { toggleSort: toggleSortOrder } = result.current;

    act(() => {
      toggleSort();
    });

    const { sortedEmployees } = result.current;
    expect(sortedEmployees.map((emp) => emp.city)).toEqual([
      "Paris",
      "London",
      "Berlin",
    ]);
  });
});
