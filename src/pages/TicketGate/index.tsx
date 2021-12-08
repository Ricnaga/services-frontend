import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import api from '../../services/api';
import { LoadingButton } from '../../components/@common/Loading/LoadingButton';

enum TicketGateFormFields {
  id = 'id',
}

export function TicketGate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  if (displayMessage)
    setTimeout(() => {
      setDisplayMessage(false);
    }, 5000);

  const formik = useFormik({
    initialValues: {
      [TicketGateFormFields.id]: '',
    },
    onSubmit: async values => {
      setLoading(true);
      api
        .get(`/users/${values[TicketGateFormFields.id]}`)
        .then(() => {
          setMessage('Usuário permitido !');
          setDisplayMessage(true);
          setLoading(false);
        })
        .catch(() => {
          setMessage(
            'Ocorreu um erro ao autenticar, verifique com a recepção !',
          );
          setDisplayMessage(true);
          setLoading(false);
        });
    },
  });

  return (
    <Container fluid className="mt-4 w-50">
      <Card>
        <Card.Header as="h3">Insira suas credenciais</Card.Header>
        <Card.Body className="px-4">
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Inserir número do crachá"
                onChange={formik.handleChange}
                name={TicketGateFormFields.id}
                value={formik.values[TicketGateFormFields.id]}
              />
              {!loading ? (
                <Button size="lg" variant="outline-secondary" type="submit">
                  Entrar
                </Button>
              ) : (
                <LoadingButton />
              )}
            </InputGroup>
          </Form>
        </Card.Body>
        {displayMessage && (
          <Card.Footer as="h2" className="text-center">
            {message}
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
}
