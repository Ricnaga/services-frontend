import { Form as FormFormik, Formik } from 'formik';
import { Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { GetPlansItems } from '../../../../application/api/endpoints/plans';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';
import { FieldCheckbox } from '../../../../shared/components/Input/FieldCheckbox';
import { FieldText } from '../../../../shared/components/Input/FieldText';
import { LoadingCard } from '../../../../shared/components/LoadingCard';
import { useCreateUserForm } from './hooks/useCreateUserForm';

type FormCardProps = {
  pacotes: GetPlansItems[];
  onBootstrapToast: (newTitle: string, color?: 'success' | 'danger') => void;
};

export function CreateUserForm({ pacotes, onBootstrapToast }: FormCardProps) {
  const {
    data: { initialValues, loading, CreateUserFormEnum },
    functions: { onSubmit },
  } = useCreateUserForm({ onBootstrapToast, pacotes });

  if (!pacotes.length) return <LoadingCard />;

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FormFormik className="text-center mt-4">
        <Row>
          <Col>
            <Card>
              <Card.Header as="h3">Informações do cliente</Card.Header>
              <Card.Body className="px-4">
                <FieldText name={CreateUserFormEnum.nome} title="nome" />
                <FieldText name={CreateUserFormEnum.email} title="email" />
                <FieldText name={CreateUserFormEnum.rg} title="rg" />
                <FieldText
                  name={CreateUserFormEnum.endereco}
                  title="endereco"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header as="h3">Planos</Card.Header>
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Title>
                      <FieldCheckbox
                        name={CreateUserFormEnum.planos}
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
                            name={CreateUserFormEnum.planos}
                            value={pacote.nome}
                            title={pacote.nome}
                          />
                        ),
                    )}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Card.Footer className="mt-3 d-flex justify-content-end">
          <ButtonBootstrap
            title="Cadastrar"
            type="submit"
            isLoading={loading}
          />
        </Card.Footer>
      </FormFormik>
    </Formik>
  );
}
