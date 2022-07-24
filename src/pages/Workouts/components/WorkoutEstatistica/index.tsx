import { Card, Container, Table } from 'react-bootstrap';
import { GetPlansStatistics } from '../../../../application/api/endpoints/plans';
import { LoadingCard } from '../../../../shared/components/LoadingCard';

export type WorkoutEstatisticaProps = {
  estatistica: GetPlansStatistics | null;
};

export function WorkoutEstatistica({ estatistica }: WorkoutEstatisticaProps) {
  if (!estatistica) return <LoadingCard />;

  const { inscritos, totalInscritos } = estatistica;

  return (
    <Container className="mt-4 px-4">
      <Card>
        <Card.Header as="h1">Aulas mais praticadas</Card.Header>
        <Table responsive striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Inscritos</th>
              <th>Média</th>
            </tr>
          </thead>
          {inscritos.map((plano) => (
            <tbody key={plano.id}>
              <tr>
                <td>{plano.nome}</td>
                <td>{plano.inscritos}</td>
                <td>
                  {((plano.inscritos / totalInscritos) * 100).toPrecision(2)}%
                </td>
              </tr>
            </tbody>
          ))}
          <tbody>
            <tr>
              <td>Total</td>
              <td>{totalInscritos}</td>
              <td>{(totalInscritos / totalInscritos) * 100}%</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
