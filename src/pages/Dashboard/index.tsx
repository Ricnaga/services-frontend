import React, { useEffect, useState } from 'react';
import {
  HiOutlineUserAdd as UserSignup,
  HiOutlineSearch as AlterUser,
  HiOutlineDocumentDuplicate as Workouts,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { Container, Title } from './style';

const Dashboard: React.FC = () => {
  const [DayDetail, setDayDetail] = useState('');

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date().toLocaleDateString('pt-br', {
        year: 'numeric',
        month: 'long' || 'short' || 'numeric',
        weekday: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      setDayDetail(currentDate);
    }, 1000);
  }, []);

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
      {DayDetail}
    </Container>
  );
};
export default Dashboard;
