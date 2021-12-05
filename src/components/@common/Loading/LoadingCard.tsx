import { Card, Placeholder } from 'react-bootstrap';

export function LoadingCard() {
  return (
    <Card className="w-75 mx-auto">
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder className="w-100 mx-auto" />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder className="w-100" />
          <Placeholder className="w-100" />
          <Placeholder className="w-100" />
        </Placeholder>
        <Placeholder as={Card.Footer} animation="glow">
          <Placeholder className="w-100" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}
