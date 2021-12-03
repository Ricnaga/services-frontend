import React from 'react';
import { Form as FormFormik, Formik, FormikValues } from 'formik';
import { Card } from 'react-bootstrap';
import { ButtonBootstrap } from '../../@common/Button';
import { FieldText } from '../../@common/Input/FieldText';

enum FormFields {
  id = 'id',
  nome = 'nome',
  email = 'email',
  rg = 'rg',
  endereco = 'endereco',
}

interface FormCardProps {
  onFindUser: (values: FormikValues) => void;
}
export function UpdateUserForm({ onFindUser }: FormCardProps) {
  const initialValues = {
    [FormFields.id]: '',
    [FormFields.nome]: '',
    [FormFields.email]: '',
    [FormFields.rg]: '',
    [FormFields.endereco]: '',
  };
  const onSubmit = (values: FormikValues) => onFindUser(values);
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FormFormik className="text-center mt-4">
        <FieldText name={FormFields.id} title="id" />
        <FieldText name={FormFields.nome} title="nome" />
        <FieldText name={FormFields.email} title="email" />
        <FieldText name={FormFields.rg} title="rg" />
        <FieldText name={FormFields.endereco} title="endereco" />
        <Card.Footer className="mt-3 d-flex justify-content-end">
          <ButtonBootstrap title="Buscar" type="submit" />
        </Card.Footer>
      </FormFormik>
    </Formik>
  );
}
