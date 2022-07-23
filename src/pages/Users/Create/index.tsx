import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { PushNotification } from '../../../components/@common/PushNotification';
import { CreateUserForm } from './components/CreateUserForm';
import { useCreateUsers } from './hooks/useCreateUsers';

export function CreateUsers() {
  const {
    data: { pacotes, color, isOpenPushNotification, title },
    functions: { onOpenPushNotification, onClosePushNotification },
  } = useCreateUsers();

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title as="h1">Cadastro de cliente</Card.Title>
          <CreateUserForm
            pacotes={pacotes}
            onPushNotification={onOpenPushNotification}
          />
        </Card.Body>
      </Card>
      <PushNotification
        color={color}
        title={title}
        isOpen={isOpenPushNotification}
        onClose={onClosePushNotification}
      />
    </Container>
  );
}
