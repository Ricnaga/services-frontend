export const useWorkoutServicoForm = () => {
  enum UseWorkoutServicoFormEnum {
    id = 'id',
    nome = 'nome',
    email = 'email',
    rg = 'rg',
    endereco = 'endereco',
    conta = 'conta',
  }
  const initialValues = {
    [UseWorkoutServicoFormEnum.id]: '',
    [UseWorkoutServicoFormEnum.nome]: '',
    [UseWorkoutServicoFormEnum.email]: '',
    [UseWorkoutServicoFormEnum.rg]: '',
    [UseWorkoutServicoFormEnum.endereco]: '',
    [UseWorkoutServicoFormEnum.conta]: false,
  };
  return {
    data: {
      UseWorkoutServicoFormEnum,
      initialValues,
    },
  };
};
