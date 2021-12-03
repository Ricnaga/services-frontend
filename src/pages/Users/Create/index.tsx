import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { PushNotification } from '../../../components/@common/PushNotification';
import { CreateUserForm } from '../../../components/UsersComponent/Create/CreateUserForm';
import api from '../../../services/api';

export type CreateUserProps = {
  planos: Array<{
    id: string;
    nome: string;
    basico: string;
  }>;
};

export function CreateUsers() {
  const [pacotes, setPacotes] = useState<CreateUserProps | null>(null);
  const [color, setColor] = useState<'success' | 'danger'>('success');
  const [title, setTitle] = useState<string>('');
  const [isOpenPushNotification, setIsOpenPushNotification] =
    useState<boolean>(false);

  const handlePushNotification = (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => {
    setTitle(newTitle);
    setColor(newColor);
    setIsOpenPushNotification(true);
  };

  useEffect(() => {
    api.get('/plans').then(response => setPacotes(response.data));
  }, []);

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title as="h1">Cadastro de cliente</Card.Title>
          <CreateUserForm
            pacotes={pacotes}
            onPushNotification={handlePushNotification}
          />
        </Card.Body>
      </Card>
      <PushNotification
        color={color}
        title={title}
        isOpen={isOpenPushNotification}
        onClose={() => setIsOpenPushNotification(false)}
      />
    </Container>
  );
}
