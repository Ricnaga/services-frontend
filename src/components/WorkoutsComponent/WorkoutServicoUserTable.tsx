import { Button, Table } from 'react-bootstrap';
import { BsTools as ChangeIcon } from 'react-icons/bs';
import { LoadingButton } from '../@common/Loading/LoadingButton';
import { UsersFound } from '../UsersComponent/Update/UpdateUserModalType';

interface WorkoutServicoUserTableProps {
  onOpenOffCanvas: (id: string, nome: string) => void;
  users: Array<UsersFound>;
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
              {!loading ? (
                <Button
                  onClick={() => onOpenOffCanvas(usuario.id, usuario.nome)}
                >
                  <ChangeIcon />
                </Button>
              ) : (
                <LoadingButton />
              )}
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}
