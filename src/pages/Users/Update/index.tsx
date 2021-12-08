import React, { useState } from 'react';
import { FormikValues } from 'formik';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ServicesModal } from '../../../components/@common/Modal';
import { ServicesOffcanvas } from '../../../components/@common/OffCanvas';
import { UpdateUserForm } from '../../../components/UsersComponent/Update/UpdateUserForm';
import { UpdateUserModal } from '../../../components/UsersComponent/Update/UpdateUserModal';
import {
  ModalModel,
  UsersFound,
} from '../../../components/UsersComponent/Update/UpdateUserModalType';
import { UpdateUserTable } from '../../../components/UsersComponent/Update/UpdateUserTable';
import api from '../../../services/api';
import { UpdateUserOffcanvas } from '../../../components/UsersComponent/Update/UpdateUserOffcanvas';
import { PushNotification } from '../../../components/@common/PushNotification';

export function UpdateUsers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tipoModal, setTipoModal] = useState<ModalModel>();
  const [isOpenOffCanvas, setIsOpenOffCanvas] = useState<boolean>(false);
  const [isOpenDecisionModal, setIsOpenDecisionModal] =
    useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersFound[] | null>(null);
  const [user, setUser] = useState<UsersFound | null>(null);

  const handleChangeUser = (usuario: FormikValues) => {
    const { id, nome, rg, endereco, email, conta, created_at } = usuario;
    setUser({ id, nome, rg, endereco, email, conta, created_at });
  };
  const handleOpenOffCanvas = (usuario: UsersFound) => {
    handleChangeUser(usuario);
    setIsOpenOffCanvas(true);
  };
  const handleCloseOffCanvas = () => setIsOpenOffCanvas(false);
  const handleOpenDecisionModal = () => {
    setTipoModal(ModalModel.CONFIRMAR);
    setIsOpenDecisionModal(true);
  };

  const handleOpenDeleteModal = (usuario: UsersFound) => {
    setUser(usuario);
    setTipoModal(ModalModel.EXCLUIR);
    setIsOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenDecisionModal(false);
    setIsOpenDeleteModal(false);
  };
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
      });
  };

  const [color, setColor] = useState<'success' | 'danger'>('success');
  const [title, setTitle] = useState<string>('');
  const [isOpenPushNotification, setIsOpenPushNotification] =
    useState<boolean>(false);

  const handlePushNotification = (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => {
    setTitle(newTitle);
    setColor(newColor);
    setIsOpenPushNotification(true);
  };
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
        {users && (
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
        {user && (
          <UpdateUserOffcanvas
            onChangeUser={handleChangeUser}
            onClose={handleCloseOffCanvas}
            onConfirmationModal={handleOpenDecisionModal}
            user={user}
          />
        )}
      </ServicesOffcanvas>
      <ServicesModal
        isOpen={isOpenDecisionModal || isOpenDeleteModal}
        onClose={handleCloseModal}
        title="Você tem certeza ?"
      >
        {user && tipoModal && (
          <UpdateUserModal
            loading={loading}
            setUsers={setUsers}
            setLoading={setLoading}
            user={user}
            tipo={tipoModal}
            onCloseUpdateUserModal={handleCloseModal}
            handleOffCanvas={handleCloseOffCanvas}
            onPushNotification={handlePushNotification}
          />
        )}
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
