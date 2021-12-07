import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../../services/api';
import { LoadingButton } from '../@common/Loading/LoadingButton';
import { LoadingCard } from '../@common/Loading/LoadingCard';

type WorkoutServicoModalProps = {
  userId: string | null;
  planosUsuario: Array<string> | null;
  onConfirmationModalClose: () => void;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
  onCloseOffCanvas: () => void;
};

export function WorkoutServicoModal({
  userId,
  planosUsuario,
  onConfirmationModalClose,
  onCloseOffCanvas,
  onPushNotification,
}: WorkoutServicoModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  if (!userId || !planosUsuario) return <LoadingCard />;

  const onClose = () => {
    setLoading(true);
    api
      .put(`/usersPlans/${userId}`, planosUsuario)
      .then(() => {
        onCloseOffCanvas();
        onConfirmationModalClose();
        setLoading(false);
        onPushNotification('Serviço alterado com sucesso!', 'success');
      })
      .catch(() => {
        onCloseOffCanvas();
        onConfirmationModalClose();
        setLoading(false);
        onPushNotification(
          'Não foi possível atualizar serviço desse cliente, tente novamente',
          'danger',
        );
      });
  };
  return (
    <>
      <Modal.Body>
        Deseja realmente alterar as informações de serviço desse cliente ?
      </Modal.Body>
      <Modal.Footer>
        {!loading ? (
          <Button variant="primary" onClick={onClose}>
            Sim
          </Button>
        ) : (
          <LoadingButton />
        )}
        <Button variant="secondary" onClick={onConfirmationModalClose}>
          Não
        </Button>
      </Modal.Footer>
    </>
  );
}
