import React, { ReactNode } from 'react';
import { Button, Spinner } from 'react-bootstrap';

function LoadingButton() {
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

type ButtonBootstrapProps = {
  isLoading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  title: ReactNode | JSX.Element;
  variant?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function ButtonBootstrap({
  isLoading = false,
  type = 'submit',
  variant = 'outline-warning',
  onClick,
  title,
}: ButtonBootstrapProps) {
  if (isLoading) return <LoadingButton />;
  return (
    <Button size="lg" variant={variant} type={type} onClick={onClick}>
      {title}
    </Button>
  );
}
