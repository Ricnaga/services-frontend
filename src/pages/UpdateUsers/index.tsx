import { Card, Col, Container, Row } from 'react-bootstrap';
import { BootstrapModal } from '../../shared/components/BootstrapModal';
import { ServicesOffcanvas } from '../../shared/components/OffCanvas';
import { BootstrapToast } from '../../shared/components/BootstrapToast';
import {
  UpdateUserDeleteModal,
  UpdateUserForm,
  UpdateUserOffcanvas,
  UpdateUserOffCanvasModal,
  UpdateUserTable,
} from './components';
import { useUpdateUsers } from './hooks/useUpdateUsers';

export function UpdateUsers() {
  const {
    data: {
      users,
      loading,
      isOpenOffCanvas,
      user,
      isOpenOffCanvasModal,
      color,
      isOpenBootstrapToast,
      title,
      isOpenDeleteModal,
    },
    functions: {
      handleFindUser,
      handleOpenOffCanvas,
      handleCloseOffCanvas,
      handleChangeUser,
      handleOpenOffCanvasModal,
      handleCloseOffCanvasModal,
      onStartLoading,
      onStopLoading,
      onOpenBootstrapToast,
      onCloseBootstrapToast,
      onCloseDeleteModal,
      handleOpenDeleteModal,
    },
  } = useUpdateUsers();

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h1">Alterar dados do cliente</Card.Header>
            <Card.Body className="px-4">
              <UpdateUserForm loading={loading} onFindUser={handleFindUser} />
            </Card.Body>
          </Card>
        </Col>
        {users.length > 0 && (
          <Col>
            <UpdateUserTable
              onOpenOffCanvas={handleOpenOffCanvas}
              onOpenDeleteModal={handleOpenDeleteModal}
              users={users}
            />
          </Col>
        )}
      </Row>
      <ServicesOffcanvas
        isOpen={isOpenOffCanvas}
        onClose={handleCloseOffCanvas}
        title="Alterar dados"
      >
        <UpdateUserOffcanvas
          onChangeUser={handleChangeUser}
          onClose={handleCloseOffCanvas}
          onOffCanvasModal={handleOpenOffCanvasModal}
          user={user}
        />
      </ServicesOffcanvas>
      <BootstrapModal
        isOpen={isOpenOffCanvasModal}
        onClose={handleCloseOffCanvasModal}
        title="Você tem certeza ?"
      >
        <UpdateUserOffCanvasModal
          loading={loading}
          user={user}
          onCloseOffCanvasModal={handleCloseOffCanvasModal}
          onStartLoading={onStartLoading}
          onStopLoading={onStopLoading}
          onCloseOffCanvas={handleCloseOffCanvas}
          onOpenBootstrapToast={onOpenBootstrapToast}
        />
      </BootstrapModal>
      <BootstrapModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        title="Você tem certeza ?"
      >
        <UpdateUserDeleteModal
          user={user}
          loading={loading}
          onCloseDeleteModal={onCloseDeleteModal}
          onOpenBootstrapToast={onOpenBootstrapToast}
          onStartLoading={onStartLoading}
          onStopLoading={onStopLoading}
        />
      </BootstrapModal>
      <BootstrapToast
        color={color}
        title={title}
        isOpen={isOpenBootstrapToast}
        onClose={onCloseBootstrapToast}
      />
    </Container>
  );
}
