import { Link } from "react-router-dom";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <Container>
      <Title>Employee Management</Title>
      <Nav>
        <StyledLink to="/employees">Current Employees</StyledLink>
        <StyledLink to="/">Home</StyledLink>
      </Nav>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(120deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 26px;
  font-weight: bold;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  font-family: "Roboto", sans-serif;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
