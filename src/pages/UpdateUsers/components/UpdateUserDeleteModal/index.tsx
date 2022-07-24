import { Modal } from 'react-bootstrap';
import {
  deleteUserById,
  GetUsersParamsItems,
} from '../../../../application/api/endpoints/users';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';
import { LoadingCard } from '../../../../shared/components/LoadingCard';

type UpdateUserDeleteModalProps = {
  user: GetUsersParamsItems | null;
  loading: boolean;
  onCloseDeleteModal: () => void;
  onStartLoading: () => void;
  onStopLoading: () => void;
  onOpenBootstrapToast: (title: string, color?: 'success' | 'danger') => void;
};

export function UpdateUserDeleteModal({
  onCloseDeleteModal,
  user,
  onStartLoading,
  onStopLoading,
  loading,
  onOpenBootstrapToast,
}: UpdateUserDeleteModalProps) {
  if (!user) return <LoadingCard />;

  const onClose = async () => {
    onStartLoading();
    await deleteUserById(user.id)
      .then(({ message }) => {
        onOpenBootstrapToast(message);
        onCloseDeleteModal();
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
        Você está prestes a apagar as informações desse cliente, caso não deseje
        apagar, clique em cancelar
      </Modal.Body>
      <Modal.Footer>
        <ButtonBootstrap
          title="Apagar"
          variant="outline-primary"
          isLoading={loading}
          onClick={onClose}
        />
        <ButtonBootstrap
          title="Cancelar"
          variant="outline-secondary"
          onClick={onCloseDeleteModal}
        />
      </Modal.Footer>
    </>
  );
}
