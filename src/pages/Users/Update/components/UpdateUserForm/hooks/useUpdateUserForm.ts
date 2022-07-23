export const useUpdateUserForm = () => {
  enum UpdateUserFormEnum {
    id = 'id',
    nome = 'nome',
    email = 'email',
    rg = 'rg',
    endereco = 'endereco',
    conta = 'conta',
  }
  const initialValues = {
    [UpdateUserFormEnum.id]: '',
    [UpdateUserFormEnum.nome]: '',
    [UpdateUserFormEnum.email]: '',
    [UpdateUserFormEnum.rg]: '',
    [UpdateUserFormEnum.endereco]: '',
    [UpdateUserFormEnum.conta]: false,
  };

  return {
    data: { UpdateUserFormEnum, initialValues },
  };
};
