import React from "react";
import styled from "styled-components";
import useEmployeeListLogic, { SortCriteria } from "./EmployeeListLogic";

// Container principal
const Container = styled.div`
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

// Titre de la page
const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

// Conteneur de la barre de recherche
const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

// Barre de recherche stylisée
const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border 0.2s;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Conteneur pour les boutons de tri
const ButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

// Bouton de tri stylisé
const SortButtonStyled = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Message lorsqu'aucun employé n'est trouvé
const NoEmployeeMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
`;

// Tableau stylisé
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

// En-tête du tableau
const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #f2f2f2;
  text-align: left;
`;

// Cellule du tableau
const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
`;

// Pour les contrôles de pagination
const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

interface SortButtonProps {
  sortBy: SortCriteria;
  label: string;
  onClick: (sortBy: SortCriteria) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ sortBy, label, onClick }) => (
  <SortButtonStyled onClick={() => onClick(sortBy)}>{label}</SortButtonStyled>
);

const EmployeeList: React.FC = () => {
  const {
    employees, // Les 5 employés de la page, triés
    handleSortChange,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
  } = useEmployeeListLogic();

  return (
    <Container>
      <Title>Employee List</Title>

      {/* Barre de recherche */}
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search employees..."
        />
      </SearchContainer>

      {/* Boutons pour trier par critère */}
      <ButtonContainer>
        <SortButton
          sortBy="firstName"
          label="Sort by First Name"
          onClick={handleSortChange}
        />
        <SortButton
          sortBy="lastName"
          label="Sort by Last Name"
          onClick={handleSortChange}
        />
        <SortButton
          sortBy="startDate"
          label="Sort by Start Date"
          onClick={handleSortChange}
        />
        <SortButton
          sortBy="street"
          label="Sort by Street"
          onClick={handleSortChange}
        />
        <SortButton
          sortBy="city"
          label="Sort by City"
          onClick={handleSortChange}
        />
        <SortButton
          sortBy="state"
          label="Sort by State"
          onClick={handleSortChange}
        />
        <SortButton
          sortBy="zipCode"
          label="Sort by Zip Code"
          onClick={handleSortChange}
        />
      </ButtonContainer>

      {/* Affichage du tableau */}
      {employees.length === 0 ? (
        <NoEmployeeMessage>No employees found.</NoEmployeeMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Start Date</TableHeader>
              <TableHeader>Department</TableHeader>
              <TableHeader>Date of Birth</TableHeader>
              <TableHeader>Street</TableHeader>
              <TableHeader>City</TableHeader>
              <TableHeader>State</TableHeader>
              <TableHeader>Zip Code</TableHeader>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.startDate}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.dateOfBirth}</TableCell>
                <TableCell>{employee.street}</TableCell>
                <TableCell>{employee.city}</TableCell>
                <TableCell>{employee.state}</TableCell>
                <TableCell>{employee.zipCode}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Contrôles de pagination */}
      {totalPages > 1 && (
        <PaginationControls>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </PaginationControls>
      )}
    </Container>
  );
};

export default EmployeeList;
