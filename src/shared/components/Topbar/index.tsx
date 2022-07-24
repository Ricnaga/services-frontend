import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsClock } from 'react-icons/bs';
import { getDateCalendarHour } from '../../utils/date';

export function Topbar() {
  const [clock, setClock] = useState<string | null>(getDateCalendarHour());

  useEffect(() => {
    setInterval(() => {
      setClock(null);
      setClock(getDateCalendarHour());
    }, 30000);
  }, [clock]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
            <Navbar.Text>
              <BsClock className="mx-2" />
              {clock}
            </Navbar.Text>
            <Nav.Link href="/Ticket">Catraca</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
