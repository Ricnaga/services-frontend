import { Button, Table } from 'react-bootstrap';
import {
  BsFillTrashFill as TrashIcon,
  BsTools as ChangeIcon,
} from 'react-icons/bs';
import { GetUsersParamsItems } from '../../../../../application/api/endpoints/users';

interface UsersTableProps {
  onOpenOffCanvas: (usuario: GetUsersParamsItems) => void;
  onOpenDeleteModal: (usuario: GetUsersParamsItems) => void;
  users: Array<GetUsersParamsItems>;
}

export function UpdateUserTable({
  onOpenOffCanvas,
  onOpenDeleteModal,
  users,
}: UsersTableProps) {
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
          <th colSpan={2}>Opções</th>
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
              <Button
                variant="outline-primary"
                onClick={() => onOpenOffCanvas(usuario)}
              >
                <ChangeIcon />
              </Button>
            </td>
            <td>
              <Button
                variant="outline-primary"
                onClick={() => onOpenDeleteModal(usuario)}
              >
                <TrashIcon />
              </Button>
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}
