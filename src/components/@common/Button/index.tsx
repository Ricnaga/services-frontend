import React from 'react';
import { Button } from 'react-bootstrap';

type ButtonBootstrapProps = {
  title: string;
  type: 'submit' | 'reset';
};

export function ButtonBootstrap({ title, type }: ButtonBootstrapProps) {
  return (
    <Button variant="primary" type={type} size="lg">
      {title}
    </Button>
  );
}
