import { GetPlansItems } from '../../../../../application/api/endpoints/plans';
import { GetUserPlansByIdItems } from '../../../../../application/api/endpoints/usersPlans';

export type UseWorkoutServicoOffCanvasOnSubmit = Record<
  'planos',
  Array<string>
>;

type UseWorkoutServicoOffCanvasProps = {
  pacotes: Array<GetPlansItems>;
  pacotesUsuario: Array<GetUserPlansByIdItems>;
  onSubmitService: (
    values: UseWorkoutServicoOffCanvasOnSubmit,
    id: string,
  ) => void;
};

export const useWorkoutServicoOffCanvas = ({
  pacotes,
  pacotesUsuario,
  onSubmitService,
}: UseWorkoutServicoOffCanvasProps) => {
  enum UseWorkoutServicoOffCanvasEnum {
    planos = 'planos',
  }

  const formPlanos = pacotesUsuario
    .reduce(
      (accumulator, element) => {
        pacotes
          .filter((pacote) => pacote.id === element.service_id)
          .map((pacote) => {
            if (pacote.basico && !accumulator.includes('basico'))
              return accumulator.push('basico');

            return accumulator.push(pacote.nome);
          });
        return accumulator;
      },
      [''],
    )
    .filter((pacote) => pacote !== '');

  const initialValues = {
    [UseWorkoutServicoOffCanvasEnum.planos]: formPlanos,
  };

  const onSubmit = async (values: UseWorkoutServicoOffCanvasOnSubmit) => {
    const service = pacotesUsuario.shift();
    if (service) onSubmitService(values, service.user_id);
  };

  return {
    data: { UseWorkoutServicoOffCanvasEnum, initialValues },
    functions: { onSubmit },
  };
};
