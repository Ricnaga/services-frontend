import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

export function LoadingCard() {
  return (
    <Card className="w-100 mx-auto">
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder className="w-100 mx-auto my-2" />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder className="w-100 my-2" />
          <Placeholder className="w-100 my-2" />
          <Placeholder className="w-100 my-2" />
          <Placeholder className="w-100 my-2" />
        </Placeholder>
        <Placeholder as={Card.Footer} animation="glow">
          <Placeholder className="w-100 my-2" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}
