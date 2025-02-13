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

import useSortByStreet from "../../src/hooks/useSortByStreet"

describe("useSortByStreet", () => {
  it("tri par défaut en ordre ascendant (street)", () => {
    const { result } = renderHook(() => useSortByStreet())
    const { sortedEmployees } = result.current

    expect(sortedEmployees.map((emp) => emp.street)).toEqual([
      "123 Main St",
      "456 Another Rd",
      "789 Boulevard",
    ])
  })

  it("passe en ordre descendant après toggleSortOrder", () => {
    const { result } = renderHook(() => useSortByStreet())
    const { toggleSortOrder } = result.current

    act(() => {
      toggleSortOrder()
    })

    const { sortedEmployees } = result.current
    expect(sortedEmployees.map((emp) => emp.street)).toEqual([
      "789 Boulevard",
      "456 Another Rd",
      "123 Main St",
    ])
  })
})
