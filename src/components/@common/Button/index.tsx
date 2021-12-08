import React from 'react';
import { Button } from 'react-bootstrap';

type ButtonBootstrapProps = {
  title: string;
  type: 'submit' | 'reset';
};

export function ButtonBootstrap({ title, type }: ButtonBootstrapProps) {
  return (
    <Button variant="outline-warning" type={type} size="lg">
      {title}
    </Button>
  );
}
