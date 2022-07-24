import React, { ReactNode } from 'react';
import { Offcanvas } from 'react-bootstrap';

type ServicesOffcanvasProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export function ServicesOffcanvas({
  isOpen,
  onClose,
  children,
  title,
}: ServicesOffcanvasProps) {
  return (
    <Offcanvas
      show={isOpen}
      scroll={false}
      backdrop={false}
      onHide={onClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        {title && <Offcanvas.Title>{title}</Offcanvas.Title>}
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}
