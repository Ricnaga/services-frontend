import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ServicesOffcanvas } from '../../../shared/components/OffCanvas';
import {
  UpdateUserTable,
  UpdateUserDeleteModal,
  UpdateUserForm,
  UpdateUserOffCanvasModal,
  UpdateUserOffcanvas,
} from './components';
import { PushNotification } from '../../../shared/components/PushNotification';
import { useUpdateUsers } from './hooks/useUpdateUsers';
import { BootstrapModal } from '../../../shared/components/BootstrapModal';

export function UpdateUsers() {
  const {
    data: {
      users,
      loading,
      isOpenOffCanvas,
      user,
      isOpenOffCanvasModal,
      color,
      isOpenPushNotification,
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
      onOpenPushNotification,
      onClosePushNotification,
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
          onOpenPushNotification={onOpenPushNotification}
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
          onOpenPushNotification={onOpenPushNotification}
          onStartLoading={onStartLoading}
          onStopLoading={onStopLoading}
        />
      </BootstrapModal>
      <PushNotification
        color={color}
        title={title}
        isOpen={isOpenPushNotification}
        onClose={onClosePushNotification}
      />
    </Container>
  );
}
