import { GetUsersParamsItems } from '../../../../../../application/api/endpoints/users';

type UseUpdateUserOffcanvasProps = {
  onChangeUser: (values: GetUsersParamsItems) => void;
  user: GetUsersParamsItems;
};

export const useUpdateUserOffcanvas = ({
  onChangeUser,
  user,
}: UseUpdateUserOffcanvasProps) => {
  enum UpdateUserOffcanvasEnum {
    nome = 'nome',
    email = 'email',
    rg = 'rg',
    endereco = 'endereco',
    conta = 'conta',
  }
  const initialValues = {
    [UpdateUserOffcanvasEnum.nome]: user.nome,
    [UpdateUserOffcanvasEnum.email]: user.email,
    [UpdateUserOffcanvasEnum.rg]: user.rg,
    [UpdateUserOffcanvasEnum.endereco]: user.endereco,
    [UpdateUserOffcanvasEnum.conta]: user.conta,
  };

  const onSubmit = (values: Omit<GetUsersParamsItems, 'id' | 'created_at'>) =>
    onChangeUser({ ...user, ...values });

  return {
    data: { UpdateUserOffcanvasEnum, initialValues },
    functions: { onSubmit },
  };
};
