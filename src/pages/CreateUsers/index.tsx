import { Card, Container } from 'react-bootstrap';
import { BootstrapToast } from '../../shared/components/BootstrapToast';
import { CreateUserForm } from './components/CreateUserForm';
import { useCreateUsers } from './hooks/useCreateUsers';

export function CreateUsers() {
  const {
    data: { pacotes, color, isOpenBootstrapToast, title },
    functions: { onOpenBootstrapToast, onCloseBootstrapToast },
  } = useCreateUsers();

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title as="h1">Cadastro de cliente</Card.Title>
          <CreateUserForm
            pacotes={pacotes}
            onBootstrapToast={onOpenBootstrapToast}
          />
        </Card.Body>
      </Card>
      <BootstrapToast
        color={color}
        title={title}
        isOpen={isOpenBootstrapToast}
        onClose={onCloseBootstrapToast}
      />
    </Container>
  );
}
