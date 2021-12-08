import React, { useState } from 'react';
import { FormikValues } from 'formik';
import { Card, Col, Container, Row } from 'react-bootstrap';
import api from '../../services/api';
import { ServicesModal } from '../@common/Modal';
import { ServicesOffcanvas } from '../@common/OffCanvas';
import { PushNotification } from '../@common/PushNotification';
import { WorkoutServicoForm } from './WorkoutServicoForm';
import { WorkoutServicoModal } from './WorkoutServicoModal';
import {
  WorkoutServicoOffcanvas,
  WorkoutServicoOffcanvasPlanosProps,
  WorkoutServicoOffcanvasPlanosUsuarioProps,
} from './WorkoutServicoOffcanvas';
import { WorkoutServicoUserTable } from './WorkoutServicoUserTable';

export interface WorkoutServicosProps {
  id: string;
  nome: string;
  rg: string;
  endereco: string;
  email: string;
  conta: boolean;
  created_at: Date;
}

export type WorkoutServicosPlanosProps = {
  planos: Array<WorkoutServicoOffcanvasPlanosProps>;
};
export type WorkoutServicosPlanosUsuarioProps = {
  id: string;
  nome: string;
  basico: string;
};

export function WorkoutServicos() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<WorkoutServicosProps[] | null>(null);
  const [planosUsuario, setPlanosUsuario] = useState<string[] | null>(null);
  const [pacotes, setPacotes] = useState<WorkoutServicosPlanosProps | null>(
    null,
  );
  const [pacotesUsuario, setPacotesUsuario] = useState<
    WorkoutServicoOffcanvasPlanosUsuarioProps[] | null
  >(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isOpenOffCanvas, setIsOpenOffCanvas] = useState<boolean>(false);
  const [isOpenDecisionModal, setIsOpenDecisionModal] =
    useState<boolean>(false);
  const [isOpenPushNotification, setIsOpenPushNotification] =
    useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<'success' | 'danger'>('success');
  const handlePushNotification = (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => {
    setTitle(newTitle);
    setColor(newColor);
    setIsOpenPushNotification(true);
  };

  const handleChangeService = (servicosUsuario: FormikValues, id: string) => {
    const { planos } = servicosUsuario;
    setPlanosUsuario(planos);
    setUserId(id);
  };

  const handleOpenOffCanvas = (id: string, nome: string) => {
    setLoading(true);
    api
      .get('/plans')
      .then(responsePlans => setPacotes(responsePlans.data))
      .catch(() => {
        setLoading(false);
        handlePushNotification(
          'Erro ao buscar lista de serviço, tente novamente',
          'danger',
        );
      });

    api
      .get(`/usersPlans/${id}`)
      .then(response => {
        setTitle(nome);
        setPacotesUsuario(response.data);
        setIsOpenOffCanvas(true);
        setLoading(false);
      })
      .catch(response => {
        setLoading(false);
        handlePushNotification(response, 'danger');
      });
  };
  const handleCloseOffCanvas = () => setIsOpenOffCanvas(false);

  const handleOpenDecisionModal = () => {
    setIsOpenDecisionModal(true);
  };
  const handleCloseModal = () => setIsOpenDecisionModal(false);

  const handleFindUser = (values: FormikValues) => {
    setLoading(true);
    api
      .get('/users', {
        params: {
          values,
        },
      })
      .then(response => {
        setLoading(false);
        setUsers(response.data);
      })
      .catch(() => {
        setLoading(false);
        handlePushNotification(
          'Erro ao buscar dados do cliente, tente novamente',
          'danger',
        );
      });
  };

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
              onOpenOffCanvas={handleOpenOffCanvas}
              users={users}
            />
          </Col>
        )}
      </Row>
      <ServicesOffcanvas
        isOpen={isOpenOffCanvas}
        onClose={handleCloseOffCanvas}
        title="Alterar serviço"
      >
        <WorkoutServicoOffcanvas
          pacotes={pacotes}
          pacotesUsuario={pacotesUsuario}
          title={title}
          onSubmitService={handleChangeService}
          onClose={handleCloseOffCanvas}
          onConfirmationModal={handleOpenDecisionModal}
        />
      </ServicesOffcanvas>
      <ServicesModal
        isOpen={isOpenDecisionModal}
        onClose={handleCloseModal}
        title="Você tem certeza ?"
      >
        <WorkoutServicoModal
          planosUsuario={planosUsuario}
          userId={userId}
          onCloseOffCanvas={handleCloseOffCanvas}
          onPushNotification={handlePushNotification}
          onConfirmationModalClose={handleCloseModal}
        />
      </ServicesModal>
      <PushNotification
        color={color}
        title={title}
        isOpen={isOpenPushNotification}
        onClose={() => setIsOpenPushNotification(false)}
      />
    </Container>
  );
}
