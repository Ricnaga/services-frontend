import { Spinner, Button } from 'react-bootstrap';

export function LoadingButton() {
  return (
    <Button variant="outline-primary" disabled>
      Carregando
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </Button>
  );
}
