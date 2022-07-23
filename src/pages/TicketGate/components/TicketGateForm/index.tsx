import React from 'react';
import { Card, Form, FormControl, InputGroup } from 'react-bootstrap';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';
import {
  TicketGateFormFields,
  useTicketGateForm,
} from './hooks/useTicketGateForm';

export function TicketGateForm() {
  const {
    data: { values, loading, displayMessage, message },
    functions: { onChange, onSubmit },
  } = useTicketGateForm();

  return (
    <>
      <Card.Body className="px-4">
        <Form onSubmit={onSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Inserir número do crachá"
              onChange={onChange}
              name={TicketGateFormFields.id}
              value={values.id}
            />
            <ButtonBootstrap isLoading={loading} title="Entrar" />
          </InputGroup>
        </Form>
      </Card.Body>
      {displayMessage && (
        <Card.Footer as="h2" className="text-center">
          {message}
        </Card.Footer>
      )}
    </>
  );
}
