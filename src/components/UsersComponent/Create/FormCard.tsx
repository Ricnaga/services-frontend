import { Form as FormFormik, Formik, FormikValues } from 'formik';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { CreateUserProps } from '../../../pages/Users/Create';
import api from '../../../services/api';
import { FieldCheckbox } from '../../@common/Input/FieldCheckbox';
import { FieldText } from '../../@common/Input/FieldText';
import { LoadingCard } from '../../@common/Loading/LoadingCard';

type FormCardProps = {
  pacotes: CreateUserProps | null;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
};

enum FormFields {
  nome = 'nome',
  email = 'email',
  rg = 'rg',
  endereco = 'endereco',
  planos = 'planos',
}

export function FormCard({ pacotes, onPushNotification }: FormCardProps) {
  if (!pacotes) return <LoadingCard />;

  const initialValues = {
    [FormFields.nome]: '',
    [FormFields.email]: '',
    [FormFields.rg]: '',
    [FormFields.endereco]: '',
    [FormFields.planos]: [],
  };
  const onSubmit = async (values: FormikValues) => {
    return api
      .post('/users', values)
      .then(() =>
        onPushNotification('Cadastro realizado com sucesso', 'success'),
      )
      .catch(() =>
        onPushNotification('Não foi possível realizar o cadastro', 'danger'),
      );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FormFormik className="text-center mt-4">
        <Row>
          <Col>
            <Card>
              <Card.Header as="h4">Informações do cliente</Card.Header>
              <Card.Body className="px-4">
                <FieldText name={FormFields.nome} title="nome" />
                <FieldText name={FormFields.email} title="email" />
                <FieldText name={FormFields.rg} title="rg" />
                <FieldText name={FormFields.endereco} title="endereco" />
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header as="h4">Planos</Card.Header>
              <Row>
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
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <h3>Total: R$ 40,00</h3>
        </Row>

        <Button className="mt-3" variant="primary" type="submit">
          Cadastrar
        </Button>
      </FormFormik>
    </Formik>
  );
}
