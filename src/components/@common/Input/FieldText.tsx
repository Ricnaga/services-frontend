import { Field } from 'formik';
import { Form } from 'react-bootstrap';
import { NomeCapitalize } from '../../../utils/string';

type FieldTextProps = {
  name: string;
  title: string;
};

export function FieldText({ title, ...rest }: FieldTextProps) {
  const newTitle = NomeCapitalize(title);
  return (
    <Form.Group className="mb-2">
      <Field
        type="text"
        placeholder={newTitle}
        className="form-control"
        {...rest}
      />
      <Form.Text className="text-muted">Preencha o {title}</Form.Text>
    </Form.Group>
  );
}
