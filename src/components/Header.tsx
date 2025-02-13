import { Link } from "react-router-dom";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <Container>
      <h1>Header</h1>
      <StyledLink to="/employees">View Current Employees</StyledLink>
      <StyledLink to="/"> ------------------------------Home</StyledLink>
    </Container>
  );
};

export default Header;

const Container = styled.div``;

const StyledLink = styled(Link)``;
