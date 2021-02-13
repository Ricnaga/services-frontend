import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './style';

const TicketGate: React.FC = () => (
  <Container>
    <Title>TicketGate - catraca</Title>
    <Input name="Login" />
    <Button>Acessar</Button>
    <p>Bom treino || matrícula id1234566 vencida em dd/mm/yyyy</p>
  </Container>
);
export default TicketGate;
