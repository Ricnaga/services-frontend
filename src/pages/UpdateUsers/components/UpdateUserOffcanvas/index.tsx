import { Field, Form as FormFormik, Formik } from 'formik';
import { Button, ButtonGroup, ButtonToolbar, Card } from 'react-bootstrap';
import { GetUsersParamsItems } from '../../../../application/api/endpoints/users';
import { FieldText } from '../../../../shared/components/Input/FieldText';
import { LoadingCard } from '../../../../shared/components/LoadingCard';
import { useUpdateUserOffcanvas } from './hooks/useUpdateUserOffcanvas';

export type UpdateUserOffcanvasProps = {
  onClose: () => void;
  onOffCanvasModal: () => void;
  onChangeUser: (values: GetUsersParamsItems) => void;
  user: GetUsersParamsItems | null;
};

export function UpdateUserOffcanvas({
  onClose,
  onOffCanvasModal,
  onChangeUser,
  user,
}: UpdateUserOffcanvasProps) {
  if (!user) return <LoadingCard />;

  const {
    data: { UpdateUserOffcanvasEnum, initialValues },
    functions: { onSubmit },
  } = useUpdateUserOffcanvas({ onChangeUser, user });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FormFormik className="text-center mt-4">
        <FieldText name={UpdateUserOffcanvasEnum.nome} title="nome" />
        <FieldText name={UpdateUserOffcanvasEnum.email} title="email" />
        <FieldText name={UpdateUserOffcanvasEnum.rg} title="rg" />
        <FieldText name={UpdateUserOffcanvasEnum.endereco} title="endereco" />
        Conta ativa ?
        <Field
          className="form-check-input mx-2"
          name={UpdateUserOffcanvasEnum.conta}
          type="checkbox"
        />
        <Card.Footer className="mt-3 d-flex justify-content-end">
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                type="submit"
                variant="outline-primary"
                onClick={onOffCanvasModal}
              >
                Salvar
              </Button>
              <Button type="reset" variant="outline-danger" onClick={onClose}>
                Cancelar
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Footer>
      </FormFormik>
    </Formik>
  );
}
