import React from 'react';
import { Form as FormFormik, Formik } from 'formik';
import {
  ButtonGroup,
  ButtonToolbar,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { FieldCheckbox } from '../../../../shared/components/Input/FieldCheckbox';
import { LoadingCard } from '../../../../shared/components/LoadingCard/LoadingCard';
import { GetPlansItems } from '../../../../application/api/endpoints/plans';
import { GetUserPlansByIdItems } from '../../../../application/api/endpoints/usersPlans';
import {
  useWorkoutServicoOffCanvas,
  UseWorkoutServicoOffCanvasOnSubmit,
} from './hooks/useWorkoutServicoOffCanvas';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';

export type WorkoutServicoOffcanvasPlanosProps = {
  id: string;
  nome: string;
  basico: string;
};

type WorkoutServicoOffCanvasProps = {
  onClose: () => void;
  onConfirmationModal: () => void;
  onSubmitService: (
    values: UseWorkoutServicoOffCanvasOnSubmit,
    id: string,
  ) => void;
  pacotes: Array<GetPlansItems> | null;
  pacotesUsuario: Array<GetUserPlansByIdItems> | null;
  title: string;
};

export function WorkoutServicoOffCanvas({
  onClose,
  onConfirmationModal,
  onSubmitService,
  pacotes,
  pacotesUsuario,
  title,
}: WorkoutServicoOffCanvasProps) {
  if (!pacotes || !pacotesUsuario) return <LoadingCard />;

  const {
    data: { UseWorkoutServicoOffCanvasEnum, initialValues },
    functions: { onSubmit },
  } = useWorkoutServicoOffCanvas({ pacotes, pacotesUsuario, onSubmitService });

  return (
    <Card>
      <Card.Header as="h3">{title}</Card.Header>
      <Row>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <FormFormik className="text-center mt-4">
            <Col>
              <Card.Body>
                <Card.Title>
                  <FieldCheckbox
                    name={UseWorkoutServicoOffCanvasEnum.planos}
                    value="basico"
                    title="Básico"
                  />
                </Card.Title>
                <Form.Group className="mb-2">
                  <ListGroup>
                    {pacotes.map(
                      (pacote) =>
                        pacote.basico && (
                          <ListGroup.Item key={pacote.id}>
                            {pacote.nome}
                          </ListGroup.Item>
                        ),
                    )}
                  </ListGroup>
                </Form.Group>
              </Card.Body>
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>Adicional</Card.Title>
                {pacotes.map(
                  (pacote) =>
                    !pacote.basico && (
                      <FieldCheckbox
                        key={pacote.id}
                        name={UseWorkoutServicoOffCanvasEnum.planos}
                        value={pacote.nome}
                        title={pacote.nome}
                      />
                    ),
                )}
              </Card.Body>
            </Col>
            <Card.Footer className="mt-3 d-flex justify-content-end">
              <ButtonToolbar>
                <ButtonGroup>
                  <ButtonBootstrap
                    title="Salvar"
                    variant="outline-primary"
                    onClick={onConfirmationModal}
                  />
                  <ButtonBootstrap
                    type="reset"
                    title="Cancelar"
                    variant="outline-danger"
                    onClick={onClose}
                  />
                </ButtonGroup>
              </ButtonToolbar>
            </Card.Footer>
          </FormFormik>
        </Formik>
      </Row>
    </Card>
  );
}
