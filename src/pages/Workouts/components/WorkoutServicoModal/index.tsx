import { Modal } from 'react-bootstrap';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';
import { LoadingCard } from '../../../../shared/components/LoadingCard/LoadingCard';
import { useWorkoutServicoModal } from './hooks/useWorkoutServicoModal';

export type WorkoutServicoModalProps = {
  userId: string | null;
  planosUsuario: Array<string> | null;
  onConfirmationModalClose: () => void;
  onOpenPushNotification: (title: string, color?: 'success' | 'danger') => void;
  onCloseOffCanvas: () => void;
};

export function WorkoutServicoModal({
  userId,
  planosUsuario,
  onConfirmationModalClose,
  onCloseOffCanvas,
  onOpenPushNotification,
}: WorkoutServicoModalProps) {
  const {
    data: { loading },
    functions: { onClose },
  } = useWorkoutServicoModal({
    onCloseOffCanvas,
    onConfirmationModalClose,
    onOpenPushNotification,
    planosUsuario,
    userId,
  });
  if (!userId || !planosUsuario) return <LoadingCard />;

  return (
    <>
      <Modal.Body>
        Deseja realmente alterar as informações de serviço desse cliente ?
      </Modal.Body>
      <Modal.Footer>
        <ButtonBootstrap
          variant="outline-primary"
          onClick={onClose}
          isLoading={loading}
          title="Sim"
        />
        <ButtonBootstrap
          variant="outline-secondary"
          onClick={onConfirmationModalClose}
          title="Não"
        />
      </Modal.Footer>
    </>
  );
}
