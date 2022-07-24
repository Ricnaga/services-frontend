import { Card, Container } from 'react-bootstrap';
import { TicketGateForm } from './components/TicketGateForm';

export function TicketGate() {
  return (
    <Container fluid className="mt-4 w-50">
      <Card>
        <Card.Header as="h3">Insira suas credenciais</Card.Header>
        <TicketGateForm />
      </Card>
    </Container>
  );
}
