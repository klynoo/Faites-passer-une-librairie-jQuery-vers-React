import { create } from "zustand";
import mockEmployees from "./mocks/usersMock";

export interface Employee {
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: mockEmployees, // Fausses données initialisées ici
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
}));

export default useEmployeeStore;
