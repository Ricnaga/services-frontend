import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { LiveClock } from './clock';

export function Topbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/workouts">Pacotes</Nav.Link>
            <NavDropdown title="Usuários">
              <NavDropdown.Item href="/create">Adicionar</NavDropdown.Item>
              <NavDropdown.Item href="/update">Alterar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <LiveClock />
            <Nav.Link href="/Ticket">Catraca</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
