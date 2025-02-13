import React from "react";
import styled from "styled-components";
import useEmployeeListLogic, { SortCriteria } from "./EmployeeListLogic";

// SORT BUTTON COMPONENT
interface SortButtonProps {
  sortBy: SortCriteria;
  label: string;
  onClick: (sortBy: SortCriteria) => void;
  currentSort: SortCriteria;
  sortOrder: "asc" | "desc";
}

const SortButton: React.FC<SortButtonProps> = ({
  sortBy,
  onClick,
  currentSort,
  sortOrder,
}) => {
  const isActive = currentSort === sortBy;

  return (
    <SortButtonContainer onClick={() => onClick(sortBy)}>
      <SortArrow active={isActive && sortOrder === "asc"}>▲</SortArrow>
      <SortArrow active={isActive && sortOrder === "desc"}>▼</SortArrow>
    </SortButtonContainer>
  );
};

// MAIN COMPONENT
const EmployeeList: React.FC = () => {
  const {
    employees,
    handleSortChange,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    currentSort,
    sortOrder,
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

      {employees.length === 0 ? (
        <NoEmployeeMessage>No employees found.</NoEmployeeMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>
                <FlexContainer>
                  First Name
                  <SortButton
                    sortBy="firstName"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>

              <TableHeader>
                <FlexContainer>
                  Last Name
                  <SortButton
                    sortBy="lastName"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
              <TableHeader>
                <FlexContainer>
                  Start Date
                  <SortButton
                    sortBy="startDate"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
              <TableHeader>
                <FlexContainer>
                  Department
                  <SortButton
                    sortBy="department"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
              <TableHeader>
                <FlexContainer>
                  Date of Birth
                  <SortButton
                    sortBy="dateOfBirth"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
              <TableHeader>
                <FlexContainer>
                  Street
                  <SortButton
                    sortBy="street"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
              <TableHeader>
                <FlexContainer>
                  City
                  <SortButton
                    sortBy="city"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
              <TableHeader>
                <FlexContainer>
                  State
                  <SortButton
                    sortBy="state"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
              <TableHeader>
                <FlexContainer>
                  Zip Code
                  <SortButton
                    sortBy="zipCode"
                    label=""
                    onClick={handleSortChange}
                    currentSort={currentSort}
                    sortOrder={sortOrder}
                  />
                </FlexContainer>
              </TableHeader>
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
          <PageButton onClick={goToPrevPage} disabled={currentPage === 1}>
            « Prev
          </PageButton>
          <PageInfo>
            Page {currentPage} / {totalPages}
          </PageInfo>
          <PageButton
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next »
          </PageButton>
        </PaginationControls>
      )}
    </Container>
  );
};

export default EmployeeList;

const Container = styled.div`
  padding: 20px;
  font-family: "Roboto", sans-serif;
  background: linear-gradient(120deg, #f0f0f0, #fafafa);
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  letter-spacing: 1px;
`;

const SearchContainer = styled.div`
  margin: 0 auto 30px;
  max-width: 400px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SortButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* Superpose les flèches */
  align-items: center;
  cursor: pointer;
  padding: 4px;
`;

const SortArrow = styled.span<{ active: boolean }>`
  font-size: 12px;
  color: ${({ active }) =>
    active ? "#000" : "#ccc"}; /* Gris clair par défaut */
  transition: color 0.2s ease;

  &:hover {
    color: #000; /* Assombrit la flèche au survol */
  }
`;

const NoEmployeeMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  margin-top: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 14px 16px;
  background-color: #f8f8f8;
  text-align: left;
  font-weight: 600;
  position: relative;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center; /* Aligner verticalement le texte et les flèches */
  gap: 8px; /* Espacement entre le texte et les flèches */
`;

const TableCell = styled.td`
  border-bottom: 1px solid #eee;
  padding: 12px 16px;
  text-align: left;
  vertical-align: middle;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 20px;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#3498db")};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#2980b9")};
  }
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #555;
`;
