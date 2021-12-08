import { Field, Form as FormFormik, Formik, FormikValues } from 'formik';
import { Card } from 'react-bootstrap';
import { ButtonBootstrap } from '../@common/Button';
import { FieldText } from '../@common/Input/FieldText';
import { LoadingButton } from '../@common/Loading/LoadingButton';

enum FormFields {
  id = 'id',
  nome = 'nome',
  email = 'email',
  rg = 'rg',
  endereco = 'endereco',
  conta = 'conta',
}

interface WorkoutServicoFormProps {
  onFindUser: (values: FormikValues) => void;
  loading: boolean;
}

export function WorkoutServicoForm({
  onFindUser,
  loading,
}: WorkoutServicoFormProps) {
  const initialValues = {
    [FormFields.id]: '',
    [FormFields.nome]: '',
    [FormFields.email]: '',
    [FormFields.rg]: '',
    [FormFields.endereco]: '',
    [FormFields.conta]: false,
  };
  const onSubmit = (values: FormikValues) => onFindUser(values);
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FormFormik className="text-center mt-3">
        <FieldText name={FormFields.id} title="id" />
        <FieldText name={FormFields.nome} title="nome" />
        <FieldText name={FormFields.email} title="email" />
        <FieldText name={FormFields.rg} title="rg" />
        <FieldText name={FormFields.endereco} title="endereco" />
        Conta ativa
        <Field
          className="form-check-input mx-2"
          name={FormFields.conta}
          type="checkbox"
        />
        <Card.Footer className="mt-3 d-flex justify-content-end">
          {!loading ? (
            <ButtonBootstrap title="Buscar" type="submit" />
          ) : (
            <LoadingButton />
          )}
        </Card.Footer>
      </FormFormik>
    </Formik>
  );
}
