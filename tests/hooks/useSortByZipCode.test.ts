import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Employee } from "../../src/components/Store"

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
    zipCode: "84000",
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
]

vi.mock("../../src/components/Store", () => {
  return {
    __esModule: true,
    default: (selector: (state: { employees: Employee[] }) => Employee[]) => {
      return selector({ employees: mockEmployees })
    },
  }
})

import useSortByZipCode from "../../src/hooks/useSortByZipCode"

describe("useSortByZipCode", () => {
  it("tri par défaut en ordre ascendant (zipCode)", () => {
    const { result } = renderHook(() => useSortByZipCode())
    const { sortedEmployees } = result.current

    expect(sortedEmployees.map((emp) => emp.zipCode)).toEqual([
      "10115",
      "75000",
      "84000",
    ])
  })

  it("passe en ordre descendant après toggleSortOrder", () => {
    const { result } = renderHook(() => useSortByZipCode())
    const { toggleSortOrder } = result.current

    act(() => {
      toggleSortOrder()
    })

    const { sortedEmployees } = result.current
    expect(sortedEmployees.map((emp) => emp.zipCode)).toEqual([
      "84000",
      "75000",
      "10115",
    ])
  })
})
