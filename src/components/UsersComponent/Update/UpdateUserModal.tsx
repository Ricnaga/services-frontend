import { Button, Modal } from 'react-bootstrap';
import api from '../../../services/api';
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
  onPushNotification,
}: ConfirmationModalProps) {
  const onClose = () => {
    const { id, conta, email, endereco, nome, rg } = user;
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
          .then(response => setUsers(response.data))
          .catch(response =>
            onPushNotification(response.data.message, 'danger'),
          );
      })
      .catch(() =>
        onPushNotification(
          'Erro ao atualizar dados do usuário, tente novamente',
          'danger',
        ),
      );
  };
  return (
    <>
      <Modal.Body>
        Deseja realmente alterar as informações desse cliente ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Sim
        </Button>
        <Button variant="secondary" onClick={onConfirmationModalClose}>
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
}: DeleteModalProps) {
  const onClose = () => {
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
          .then(response => setUsers(response.data))
          .catch(response =>
            onPushNotification(response.data.message, 'danger'),
          );
      })
      .catch(() =>
        onPushNotification(
          'Erro ao atualizar dados do usuário, tente novamente',
          'danger',
        ),
      );
  };
  return (
    <>
      <Modal.Body>
        Você está prestes a apagar as informações desse cliente, caso não deseje
        apagar, clique em cancelar
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Apagar
        </Button>
        <Button variant="secondary" onClick={onDeleteModalClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </>
  );
}

export function UpdateUserModal({
  tipo,
  user,
  onCloseUpdateUserModal,
  handleOffCanvas,
  setUsers,
  onPushNotification,
}: UpdateUserModalProps) {
  switch (tipo) {
    case ModalModel.CONFIRMAR:
      return (
        <ConfirmationModal
          setUsers={setUsers}
          user={user}
          onConfirmationModalClose={onCloseUpdateUserModal}
          onHideOffCanvasClose={handleOffCanvas}
          onPushNotification={onPushNotification}
        />
      );
    case ModalModel.EXCLUIR:
      return (
        <DeleteModal
          user={user}
          setUsers={setUsers}
          onDeleteModalClose={onCloseUpdateUserModal}
          onPushNotification={onPushNotification}
        />
      );
    default:
      return null;
  }
}
