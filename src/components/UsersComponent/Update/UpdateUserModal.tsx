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
  onModalClose,
  onHideOffCanvasClose,
  setUsers,
  onPushNotification,
}: ConfirmationModalProps) {
  const handleCloseModal = () => {
    const { id, conta, email, endereco, nome, rg } = user;
    api
      .patch(`/users/${id}`, { nome, rg, endereco, email, conta })
      .then(responseId => {
        onModalClose();
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
        <Button variant="primary" onClick={handleCloseModal}>
          Sim
        </Button>
        <Button variant="secondary" onClick={onModalClose}>
          Não
        </Button>
      </Modal.Footer>
    </>
  );
}

function DeleteModal({
  onModalClose,
  user,
  onPushNotification,
  setUsers,
}: DeleteModalProps) {
  const handleCloseModal = () => {
    api
      .delete(`/users/${user.id}`)
      .then(responseId => {
        onPushNotification(responseId.data.message, 'success');
        onModalClose();
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
        <Button variant="primary" onClick={handleCloseModal}>
          Apagar
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </>
  );
}

export function UpdateUserModal({
  tipo,
  user,
  handleModal,
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
          onModalClose={handleModal}
          onHideOffCanvasClose={handleOffCanvas}
          onPushNotification={onPushNotification}
        />
      );
    case ModalModel.EXCLUIR:
      return (
        <DeleteModal
          user={user}
          setUsers={setUsers}
          onModalClose={handleModal}
          onPushNotification={onPushNotification}
        />
      );
    default:
      return null;
  }
}
