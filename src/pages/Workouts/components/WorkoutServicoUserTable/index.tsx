import { Table } from 'react-bootstrap';
import { BsTools as ChangeIcon } from 'react-icons/bs';
import { GetUsersParamsItems } from '../../../../application/api/endpoints/users';
import { ButtonBootstrap } from '../../../../shared/components/ButtonBootstrap';

interface WorkoutServicoUserTableProps {
  onOpenOffCanvas: (id: string, nome: string) => void;
  users: Array<GetUsersParamsItems>;
  loading: boolean;
}

export function WorkoutServicoUserTable({
  onOpenOffCanvas,
  users,
  loading,
}: WorkoutServicoUserTableProps) {
  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Nome</th>
          <th>RG</th>
          <th>E-mail</th>
          <th>Endereço</th>
          <th>Ativo</th>
          <th colSpan={2}>Alterar</th>
        </tr>
      </thead>

      {users.map((usuario, index) => (
        <tbody key={usuario.id}>
          <tr>
            <td>{index + 1}</td>
            <td>{usuario.id}</td>
            <td>{usuario.nome}</td>
            <td>{usuario.rg}</td>
            <td>{usuario.email}</td>
            <td>{usuario.endereco}</td>
            <td>{usuario.conta === true ? 'sim' : 'não'}</td>
            <td>
              <ButtonBootstrap
                variant="outline-primary"
                isLoading={loading}
                onClick={() => onOpenOffCanvas(usuario.id, usuario.nome)}
                title={<ChangeIcon />}
              />
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}
