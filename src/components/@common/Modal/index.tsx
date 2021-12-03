import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

type ServicesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
};

export function ServicesModal({
  isOpen,
  onClose,
  title,
  children,
}: ServicesModalProps) {
  return (
    <Modal show={isOpen} backdrop="static" keyboard={false} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
}
