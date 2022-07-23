import React from 'react';
import { Field, Form as FormFormik, Formik } from 'formik';
import { Card } from 'react-bootstrap';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';
import { FieldText } from '../../../../shared/components/Input/FieldText';
import { useWorkoutServicoForm } from './hooks/useWorkoutServicoForm';
import { GetUsersParamsItems } from '../../../../application/api/endpoints/users';

interface WorkoutServicoFormProps {
  onFindUser: (values: Omit<GetUsersParamsItems, 'created_at'>) => void;
  loading: boolean;
}

export function WorkoutServicoForm({
  onFindUser,
  loading,
}: WorkoutServicoFormProps) {
  const {
    data: { UseWorkoutServicoFormEnum, initialValues },
  } = useWorkoutServicoForm();

  return (
    <Formik initialValues={initialValues} onSubmit={onFindUser}>
      <FormFormik className="text-center mt-3">
        <FieldText name={UseWorkoutServicoFormEnum.id} title="id" />
        <FieldText name={UseWorkoutServicoFormEnum.nome} title="nome" />
        <FieldText name={UseWorkoutServicoFormEnum.email} title="email" />
        <FieldText name={UseWorkoutServicoFormEnum.rg} title="rg" />
        <FieldText name={UseWorkoutServicoFormEnum.endereco} title="endereco" />
        Conta ativa
        <Field
          className="form-check-input mx-2"
          name={UseWorkoutServicoFormEnum.conta}
          type="checkbox"
        />
        <Card.Footer className="mt-3 d-flex justify-content-end">
          <ButtonBootstrap title="Buscar" isLoading={loading} />
        </Card.Footer>
      </FormFormik>
    </Formik>
  );
}
