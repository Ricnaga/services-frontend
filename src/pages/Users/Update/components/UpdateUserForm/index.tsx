import React from 'react';
import { Field, Form as FormFormik, Formik } from 'formik';
import { Card } from 'react-bootstrap';
import { FieldText } from '../../../../../shared/components/Input/FieldText';
import { ButtonBootstrap } from '../../../../../shared/components/ButtonBootstrap';
import { useUpdateUserForm } from './hooks/useUpdateUserForm';
import { UpdateUserFormOnFindUser } from '../../hooks/useUpdateUsers';

interface FormCardProps {
  onFindUser: (values: UpdateUserFormOnFindUser) => void;
  loading: boolean;
}
export function UpdateUserForm({ onFindUser, loading }: FormCardProps) {
  const {
    data: { UpdateUserFormEnum, initialValues },
  } = useUpdateUserForm();

  return (
    <Formik initialValues={initialValues} onSubmit={onFindUser}>
      <FormFormik className="text-center mt-4">
        <FieldText name={UpdateUserFormEnum.id} title="id" />
        <FieldText name={UpdateUserFormEnum.nome} title="nome" />
        <FieldText name={UpdateUserFormEnum.email} title="email" />
        <FieldText name={UpdateUserFormEnum.rg} title="rg" />
        <FieldText name={UpdateUserFormEnum.endereco} title="endereco" />
        Conta
        <Field
          className="form-check-input mx-2"
          name={UpdateUserFormEnum.conta}
          type="checkbox"
        />
        <Card.Footer className="mt-3 d-flex justify-content-end">
          <ButtonBootstrap title="Buscar" isLoading={loading} />
        </Card.Footer>
      </FormFormik>
    </Formik>
  );
}
