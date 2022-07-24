import { Field } from 'formik';
import { Form } from 'react-bootstrap';

type FieldCheckboxProps = {
  name: string;
  value: string | boolean;
  title: string;
};

export function FieldCheckbox({ title, name, value }: FieldCheckboxProps) {
  return (
    <Form.Group className="form-check">
      <Field
        type="checkbox"
        className="form-check-input"
        name={name}
        value={value}
      />
      <Form.Label className="form-check-label">{title}</Form.Label>
    </Form.Group>
  );
}
