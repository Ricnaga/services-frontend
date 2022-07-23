import { useState } from 'react';
import { WorkoutServicoModalProps } from '..';
import { putUserPlansById } from '../../../../../application/api/endpoints/usersPlans';

export const useWorkoutServicoModal = ({
  onCloseOffCanvas,
  onConfirmationModalClose,
  onOpenPushNotification,
  userId,
  planosUsuario,
}: WorkoutServicoModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onStartLoading = () => setLoading(true);
  const onStopLoading = () => setLoading(false);

  const onClose = async () => {
    onStartLoading();
    if (userId && planosUsuario)
      await putUserPlansById(userId, planosUsuario)
        .then(() => {
          onCloseOffCanvas();
          onConfirmationModalClose();
          onStopLoading();
          onOpenPushNotification('Serviço alterado com sucesso!');
        })
        .catch(() => {
          onCloseOffCanvas();
          onConfirmationModalClose();
          onStopLoading();
          onOpenPushNotification(
            'Não foi possível atualizar serviço desse cliente, tente novamente',
            'danger',
          );
        });
  };

  return {
    data: { loading },
    functions: { onClose },
  };
};
