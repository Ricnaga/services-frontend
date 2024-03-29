import { Modal } from 'react-bootstrap';
import {
  GetUsersParamsItems,
  patchUsersById,
} from '../../../../application/api/endpoints/users';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';
import { LoadingCard } from '../../../../shared/components/LoadingCard';

type UpdateUserOffcanvasModalPRops = {
  loading: boolean;
  onCloseOffCanvasModal: () => void;
  onStartLoading: () => void;
  onStopLoading: () => void;
  onCloseOffCanvas: () => void;
  onOpenBootstrapToast: (title: string, color?: 'success' | 'danger') => void;
  user: GetUsersParamsItems | null;
};

export function UpdateUserOffCanvasModal({
  loading,
  onCloseOffCanvasModal,
  onStartLoading,
  onStopLoading,
  onCloseOffCanvas,
  onOpenBootstrapToast,
  user,
}: UpdateUserOffcanvasModalPRops) {
  if (!user) return <LoadingCard />;

  const onClose = async () => {
    onStartLoading();
    const { id, ...rest } = user;

    await patchUsersById(id, rest)
      .then(({ message }) => {
        onCloseOffCanvasModal();
        onCloseOffCanvas();
        onOpenBootstrapToast(message);
        onStopLoading();
      })
      .catch(() => {
        onStopLoading();
        onOpenBootstrapToast(
          'Erro ao atualizar dados do usuário, tente novamente',
          'danger',
        );
      });
  };
  return (
    <>
      <Modal.Body>
        Deseja realmente alterar as informações desse cliente ?
      </Modal.Body>
      <Modal.Footer>
        <ButtonBootstrap
          title="Sim"
          variant="outline-primary"
          isLoading={loading}
          onClick={onClose}
        />
        <ButtonBootstrap
          title="Não"
          variant="outline-secondary"
          onClick={onCloseOffCanvasModal}
        />
      </Modal.Footer>
    </>
  );
}
