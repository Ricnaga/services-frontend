import { Form as FormFormik, Formik, FormikValues } from 'formik';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { FieldCheckbox } from '../@common/Input/FieldCheckbox';
import { LoadingCard } from '../@common/Loading/LoadingCard';
import { WorkoutServicosPlanosProps } from './WorkoutServicos';

export type WorkoutServicoOffcanvasPlanosProps = {
  id: string;
  nome: string;
  basico: string;
};

export type WorkoutServicoOffcanvasPlanosUsuarioProps = {
  id: string;
  user_id: string;
  service_id: string;
  created_at: Date;
};

type WorkoutServicoOffcanvasProps = {
  onClose: () => void;
  onConfirmationModal: () => void;
  onSubmitService: (values: FormikValues, id: string) => void;
  pacotes: WorkoutServicosPlanosProps | null;
  pacotesUsuario: Array<WorkoutServicoOffcanvasPlanosUsuarioProps> | null;
  title: string;
};

enum FormFields {
  planos = 'planos',
}

export function WorkoutServicoOffcanvas({
  onClose,
  onConfirmationModal,
  onSubmitService,
  pacotes,
  pacotesUsuario,
  title,
}: WorkoutServicoOffcanvasProps) {
  if (!pacotes || !pacotesUsuario) return <LoadingCard />;

  const formPlanos = pacotesUsuario
    .reduce(
      (accumulator, element) => {
        pacotes.planos
          .filter(pacote => pacote.id === element.service_id)
          .map(pacote => {
            if (pacote.basico && !accumulator.includes('basico'))
              return accumulator.push('basico');

            return accumulator.push(pacote.nome);
          });
        return accumulator;
      },
      [''],
    )
    .filter(pacote => pacote !== '');

  const initialValues = {
    [FormFields.planos]: formPlanos,
  };

  const onSubmit = async (values: FormikValues) => {
    const service = pacotesUsuario.shift();
    if (service) return onSubmitService(values, service.user_id);
    return null;
  };

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
                    name={FormFields.planos}
                    value="basico"
                    title="Básico"
                  />
                </Card.Title>
                <Form.Group className="mb-2">
                  <ListGroup>
                    {pacotes.planos.map(
                      pacote =>
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
                {pacotes.planos.map(
                  pacote =>
                    !pacote.basico && (
                      <FieldCheckbox
                        key={pacote.id}
                        name={FormFields.planos}
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
                  <Button
                    type="submit"
                    variant="outline-primary"
                    onClick={onConfirmationModal}
                  >
                    Salvar
                  </Button>
                  <Button
                    type="reset"
                    variant="outline-danger"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Card.Footer>
          </FormFormik>
        </Formik>
      </Row>
    </Card>
  );
}
