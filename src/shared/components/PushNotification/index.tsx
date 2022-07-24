import { Toast, ToastContainer } from 'react-bootstrap';

interface PushNotificationProps {
  color: 'success' | 'danger';
  title: string;
  onClose: () => void;
  isOpen: boolean;
}

export function PushNotification({
  title,
  color = 'success',
  isOpen,
  onClose,
}: PushNotificationProps) {
  return (
    <ToastContainer className="p-3" position="bottom-start">
      <Toast bg={color} onClose={onClose} show={isOpen} delay={3000} autohide>
        <Toast.Body>{title}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
