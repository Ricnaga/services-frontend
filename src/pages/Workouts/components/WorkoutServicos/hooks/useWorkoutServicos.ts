import { useState } from 'react';
import {
  getPlans,
  GetPlansItems,
} from '../../../../../application/api/endpoints/plans';
import {
  getUsers,
  GetUsersParamsItems,
} from '../../../../../application/api/endpoints/users';
import {
  getUserPlansById,
  GetUserPlansByIdItems,
} from '../../../../../application/api/endpoints/usersPlans';
import { UseWorkoutServicoOffCanvasOnSubmit } from '../../WorkoutServicoOffCanvas/hooks/useWorkoutServicoOffCanvas';

type ToastProps = {
  title: string;
  color: 'success' | 'danger';
  isOpenBootstrapToast: boolean;
};

export const useWorkoutServicos = () => {
  const [users, setUsers] = useState<Array<GetUsersParamsItems> | null>(null);
  const [pacotes, setPacotes] = useState<Array<GetPlansItems> | null>(null);
  const [pacotesUsuario, setPacotesUsuario] =
    useState<Array<GetUserPlansByIdItems> | null>(null);
  const [nomeOffCanvas, setNomeOffCanvas] = useState<string>('');
  const [planosUsuario, setPlanosUsuario] = useState<string[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [isOpenDecisionModal, setIsOpenDecisionModal] =
    useState<boolean>(false);

  const onOpenDecisionModal = () => setIsOpenDecisionModal(true);
  const onCloseDecisionModal = () => setIsOpenDecisionModal(false);

  const [{ color, isOpenBootstrapToast, title }, setToast] =
    useState<ToastProps>({
      color: 'success',
      isOpenBootstrapToast: false,
      title: '',
    });
  const onOpenBootstrapToast = (
    title: string,
    color: 'success' | 'danger' = 'success',
  ) => setToast({ color, isOpenBootstrapToast: true, title });

  const onCloseBootstrapToast = () =>
    setToast({ isOpenBootstrapToast: false, title: '', color: 'success' });

  const [loading, setLoading] = useState<boolean>(false);
  const onStartLoading = () => setLoading(true);
  const onStopLoading = () => setLoading(false);

  const [isOpenOffCanvas, setIsOpenOffCanvas] = useState<boolean>(false);
  const onCloseOffCanvas = () => setIsOpenOffCanvas(false);
  const onOpenOffCanvas = async (id: string, nome: string) => {
    onStartLoading();
    await getPlans()
      .then((response) => setPacotes(response))
      .catch(() => {
        onStopLoading();
        onOpenBootstrapToast(
          'Erro ao buscar lista de serviço, tente novamente',
          'danger',
        );
      });
    await getUserPlansById(id)
      .then((response) => {
        setNomeOffCanvas(nome);
        setPacotesUsuario(response);
        setIsOpenOffCanvas(true);
        onStopLoading();
      })
      .catch((response) => {
        onStopLoading();
        onOpenBootstrapToast(response, 'danger');
      });
  };

  const handleFindUser = async (
    values: Omit<GetUsersParamsItems, 'created_at'>,
  ) => {
    onStartLoading();
    await getUsers(values)
      .then((response) => {
        onStopLoading();
        setUsers(response);
      })
      .catch(() => {
        onStopLoading();
        onOpenBootstrapToast(
          'Erro ao buscar dados do cliente, tente novamente',
          'danger',
        );
      });
  };

  const handleChangeService = (
    servicosUsuario: UseWorkoutServicoOffCanvasOnSubmit,
    id: string,
  ) => {
    const { planos } = servicosUsuario;
    setPlanosUsuario(planos);
    setUserId(id);
  };

  return {
    data: {
      color,
      isOpenBootstrapToast,
      title,
      loading,
      users,
      isOpenOffCanvas,
      pacotes,
      pacotesUsuario,
      nomeOffCanvas,
      planosUsuario,
      userId,
      isOpenDecisionModal,
    },
    functions: {
      handleFindUser,
      onOpenBootstrapToast,
      onCloseBootstrapToast,
      onOpenOffCanvas,
      onCloseOffCanvas,
      handleChangeService,
      onOpenDecisionModal,
      onCloseDecisionModal,
    },
  };
};
