import { useState } from 'react';
import { GetPlansItems } from '../../../../../../application/api/endpoints/plans';
import { postUser } from '../../../../../../application/api/endpoints/users';

type UseCreateUserFormProps = {
  pacotes: GetPlansItems[];
  onPushNotification: (newTitle: string, color?: 'success' | 'danger') => void;
};

type OnSubmitValues = {
  nome: string;
  email: string;
  rg: string;
  endereco: string;
  planos: Array<string>;
};

export const useCreateUserForm = ({
  onPushNotification,
  pacotes,
}: UseCreateUserFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  enum CreateUserFormEnum {
    nome = 'nome',
    email = 'email',
    rg = 'rg',
    endereco = 'endereco',
    planos = 'planos',
  }

  const initialValues = {
    [CreateUserFormEnum.nome]: '',
    [CreateUserFormEnum.email]: '',
    [CreateUserFormEnum.rg]: '',
    [CreateUserFormEnum.endereco]: '',
    [CreateUserFormEnum.planos]: new Array<string>(),
  };

  const onSubmit = async (values: OnSubmitValues) => {
    setLoading(true);

    const planosFormatados = values.planos
      .map((tipoPlano) =>
        tipoPlano === 'basico'
          ? pacotes.filter(({ basico }) => basico)
          : pacotes.filter(({ nome }) => nome === tipoPlano),
      )
      .flatMap((plano) => plano);

    await postUser({
      ...values,
      planos: planosFormatados,
    })
      .then(() => {
        setLoading(false);
        onPushNotification('Cadastro realizado com sucesso');
      })
      .catch(() => {
        setLoading(false);
        onPushNotification('Não foi possível realizar o cadastro', 'danger');
      });
  };

  return {
    data: { initialValues, loading, CreateUserFormEnum },
    functions: { onSubmit },
  };
};
