import { Container, Tab, Tabs } from 'react-bootstrap';
import { WorkoutEstatistica, WorkoutServicos } from './components';
import { useWorkouts } from './hooks/useWorkouts';

export function Workouts() {
  const {
    data: { estatistica },
  } = useWorkouts();

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
