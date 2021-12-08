import { Button, Modal } from 'react-bootstrap';
import api from '../../../services/api';
import { LoadingButton } from '../../@common/Loading/LoadingButton';
import {
  ConfirmationModalProps,
  DeleteModalProps,
  ModalModel,
  UpdateUserModalProps,
} from './UpdateUserModalType';

function ConfirmationModal({
  user,
  onConfirmationModalClose,
  onHideOffCanvasClose,
  setUsers,
  loading,
  setLoading,
  onPushNotification,
}: ConfirmationModalProps) {
  const onClose = () => {
    const { id, conta, email, endereco, nome, rg } = user;
    setLoading(true);
    api
      .patch(`/users/${id}`, { nome, rg, endereco, email, conta })
      .then(responseId => {
        onConfirmationModalClose();
        onHideOffCanvasClose();
        onPushNotification(responseId.data.message, 'success');
        api
          .get('/users', {
            params: {
              values: {
                id: '',
                nome: '',
                email: '',
                rg: '',
                endereco: '',
                conta: false,
              },
            },
          })
          .then(response => {
            setLoading(false);
            setUsers(response.data);
          })
          .catch(response => {
            setLoading(false);
            onPushNotification(response.data.message, 'danger');
          });
      })
      .catch(() => {
        setLoading(false);
        onPushNotification(
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
        {!loading ? (
          <Button variant="outline-primary" onClick={onClose}>
            Sim
          </Button>
        ) : (
          <LoadingButton />
        )}
        <Button variant="outline-secondary" onClick={onConfirmationModalClose}>
          Não
        </Button>
      </Modal.Footer>
    </>
  );
}

function DeleteModal({
  onDeleteModalClose,
  user,
  onPushNotification,
  setUsers,
  loading,
  setLoading,
}: DeleteModalProps) {
  const onClose = () => {
    setLoading(true);
    api
      .delete(`/users/${user.id}`)
      .then(responseId => {
        onPushNotification(responseId.data.message, 'success');
        onDeleteModalClose();
        api
          .get('/users', {
            params: {
              values: {
                id: '',
                nome: '',
                email: '',
                rg: '',
                endereco: '',
                conta: false,
              },
            },
          })
          .then(response => {
            setLoading(false);
            setUsers(response.data);
          })
          .catch(response => {
            setLoading(false);
            onPushNotification(response.data.message, 'danger');
          });
      })
      .catch(() => {
        setLoading(false);
        onPushNotification(
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
        {!loading ? (
          <Button variant="outline-primary" onClick={onClose}>
            Apagar
          </Button>
        ) : (
          <LoadingButton />
        )}
        <Button variant="outline-secondary" onClick={onDeleteModalClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </>
  );
}

export function UpdateUserModal({
  tipo,
  user,
  loading,
  onCloseUpdateUserModal,
  handleOffCanvas,
  setUsers,
  setLoading,
  onPushNotification,
}: UpdateUserModalProps) {
  switch (tipo) {
    case ModalModel.CONFIRMAR:
      return (
        <ConfirmationModal
          setUsers={setUsers}
          setLoading={setLoading}
          user={user}
          loading={loading}
          onConfirmationModalClose={onCloseUpdateUserModal}
          onHideOffCanvasClose={handleOffCanvas}
          onPushNotification={onPushNotification}
        />
      );
    case ModalModel.EXCLUIR:
      return (
        <DeleteModal
          user={user}
          loading={loading}
          setUsers={setUsers}
          setLoading={setLoading}
          onDeleteModalClose={onCloseUpdateUserModal}
          onPushNotification={onPushNotification}
        />
      );
    default:
      return null;
  }
}
