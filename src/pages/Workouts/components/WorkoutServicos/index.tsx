import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {
  WorkoutServicoForm,
  WorkoutServicoModal,
  WorkoutServicoOffCanvas,
  WorkoutServicoUserTable,
} from '..';
import { ServicesOffcanvas } from '../../../../components/@common/OffCanvas';
import { PushNotification } from '../../../../components/@common/PushNotification';
import { BootstrapModal } from '../../../../shared/components/BootstrapModal';
import { useWorkoutServicos } from './hooks/useWorkoutServicos';

export function WorkoutServicos() {
  const {
    data: {
      color,
      isOpenPushNotification,
      title,
      loading,
      users,
      isOpenOffCanvas,
      pacotes,
      pacotesUsuario,
      nomeOffCanvas,
      planosUsuario,
      userId,
      isOpenDecisionModal,
    },
    functions: {
      handleFindUser,
      onOpenPushNotification,
      onClosePushNotification,
      onOpenOffCanvas,
      onCloseOffCanvas,
      handleChangeService,
      onCloseDecisionModal,
      onOpenDecisionModal,
    },
  } = useWorkoutServicos();

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h1">Alterar serviço do cliente</Card.Header>
            <Card.Body className="px-4">
              <WorkoutServicoForm
                loading={loading}
                onFindUser={handleFindUser}
              />
            </Card.Body>
          </Card>
        </Col>
        {users && (
          <Col>
            <WorkoutServicoUserTable
              loading={loading}
              onOpenOffCanvas={onOpenOffCanvas}
              users={users}
            />
          </Col>
        )}
      </Row>
      <ServicesOffcanvas
        isOpen={isOpenOffCanvas}
        onClose={onCloseOffCanvas}
        title="Alterar serviço"
      >
        <WorkoutServicoOffCanvas
          pacotes={pacotes}
          pacotesUsuario={pacotesUsuario}
          title={nomeOffCanvas}
          onSubmitService={handleChangeService}
          onClose={onCloseOffCanvas}
          onConfirmationModal={onOpenDecisionModal}
        />
      </ServicesOffcanvas>
      <BootstrapModal
        isOpen={isOpenDecisionModal}
        onClose={onCloseDecisionModal}
        title="Você tem certeza ?"
      >
        <WorkoutServicoModal
          planosUsuario={planosUsuario}
          userId={userId}
          onCloseOffCanvas={onCloseOffCanvas}
          onOpenPushNotification={onOpenPushNotification}
          onConfirmationModalClose={onCloseDecisionModal}
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
