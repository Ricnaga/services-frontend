import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import {
  WorkoutEstatistica,
  WorkoutEstatisticaContentProps,
} from '../../components/WorkoutsComponent/WorkoutEstatistica';
import { WorkoutServicos } from '../../components/WorkoutsComponent/WorkoutServicos';
import api from '../../services/api';

export interface WorkoutsProps {
  inscritos: Array<WorkoutEstatisticaContentProps>;
  totalInscritos: number;
}

export function Workouts() {
  const [estatistica, setEstatistica] = useState<WorkoutsProps | null>(null);

  useEffect(() => {
    api.get('/statistics').then(response => setEstatistica(response.data));
  }, []);

  return (
    <Container className="mt-4 px-4">
      <Tabs defaultActiveKey="estatistica" className="mb-3">
        <Tab eventKey="estatistica" title="Estatística">
          <WorkoutEstatistica estatistica={estatistica} />
        </Tab>
        <Tab eventKey="alterar" title="Alterar serviços">
          <WorkoutServicos />
        </Tab>
      </Tabs>
    </Container>
  );
}
