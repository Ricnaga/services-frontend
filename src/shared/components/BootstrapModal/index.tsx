import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

type BootstrapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
};

export function BootstrapModal({
  isOpen,
  onClose,
  title,
  children,
}: BootstrapModalProps) {
  return (
    <Modal show={isOpen} backdrop="static" keyboard={false} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
}
