import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LiveClock } from './clock';

export function Topbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/workouts">Serviços</Nav.Link>
            <NavDropdown title="Clientes">
              <NavDropdown.Item href="/create">Adicionar</NavDropdown.Item>
              <NavDropdown.Item href="/update">Alterar dados</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav variant="pills">
            <LiveClock />
            <Nav.Link href="/Ticket">Catraca</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
