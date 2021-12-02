import React from 'react';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';

type FieldTextProps = {
  name: string;
  title: string;
};

export function FieldText({ title, ...rest }: FieldTextProps) {
  const namePlaceHolder = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <Form.Group className="mb-2">
      <Field
        type="text"
        placeholder={namePlaceHolder}
        className="form-control"
        {...rest}
      />
      <Form.Text className="text-muted">Preencha o {title}</Form.Text>
    </Form.Group>
  );
}
