import { Toast, ToastContainer } from 'react-bootstrap';
import { delayTime } from './hooks/useToast';

interface BootstrapToastProps {
  color: 'success' | 'danger';
  title: string | null;
  onClose: () => void;
  isOpen: boolean;
  delay?: number;
}

export function BootstrapToast({
  title,
  color = 'success',
  isOpen,
  onClose,
  delay = delayTime,
}: BootstrapToastProps) {
  return (
    <ToastContainer className="p-3" position="bottom-start">
      <Toast bg={color} onClose={onClose} show={isOpen} delay={delay} autohide>
        <Toast.Body>{title}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
