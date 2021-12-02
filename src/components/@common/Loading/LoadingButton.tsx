import { Spinner, Button } from 'react-bootstrap';

export function LoadingButton() {
  return (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Carregando...
    </Button>
  );
}
