import { Field, Form as FormFormik, Formik, FormikValues } from 'formik';
import { Button, ButtonGroup, ButtonToolbar, Card } from 'react-bootstrap';
import { FieldText } from '../../@common/Input/FieldText';
import { UsersFound } from './UpdateUserModalType';

type UpdateUserOffcanvasProps = {
  onClose: () => void;
  onConfirmationModal: () => void;
  onChangeUser: (values: FormikValues) => void;
  user: UsersFound;
};

enum FormFields {
  nome = 'nome',
  email = 'email',
  rg = 'rg',
  endereco = 'endereco',
  conta = 'conta',
}

export function UpdateUserOffcanvas({
  onClose,
  onConfirmationModal,
  onChangeUser,
  user,
}: UpdateUserOffcanvasProps) {
  const initialValues = {
    [FormFields.nome]: user.nome,
    [FormFields.email]: user.email,
    [FormFields.rg]: user.rg,
    [FormFields.endereco]: user.endereco,
    [FormFields.conta]: user.conta,
  };

  const onSubmit = (values: FormikValues) => {
    const { nome, rg, email, endereco, conta } = values;
    const changeUser = { ...user, nome, rg, email, endereco, conta };
    onChangeUser(changeUser);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FormFormik className="text-center mt-4">
        <FieldText name={FormFields.nome} title="nome" />
        <FieldText name={FormFields.email} title="email" />
        <FieldText name={FormFields.rg} title="rg" />
        <FieldText name={FormFields.endereco} title="endereco" />
        Conta ativa ?
        <Field
          className="form-check-input mx-2"
          name={FormFields.conta}
          type="checkbox"
        />
        <Card.Footer className="mt-3 d-flex justify-content-end">
          <ButtonToolbar>
            <ButtonGroup>
              <Button type="submit" onClick={onConfirmationModal}>
                Salvar
              </Button>
              <Button type="reset" variant="danger" onClick={onClose}>
                Cancelar
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Footer>
      </FormFormik>
    </Formik>
  );
}
