import React from 'react';
import {
  HiOutlineDocumentDuplicate as Workouts,
  HiOutlineSearch as AlterUser,
  HiOutlineUserAdd as UserSignup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Container, Title } from './style';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Title>Bem-vindo ao dashboard😀!</Title>
      <div>
        <Link to="/signup">
          <UserSignup />
          adicionar cliente
        </Link>

        <Link to="/changedata">
          <AlterUser />
          alterar dados do cliente
        </Link>

        <Link to="/workouts">
          <Workouts />
          Treinos
        </Link>
      </div>
      📆
      {new Date().toLocaleDateString('pt-br', {
        year: 'numeric',
        month: 'long' || 'short' || 'numeric',
        weekday: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </Container>
  );
};
export default Dashboard;
