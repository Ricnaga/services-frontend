import { useState } from 'react';
import {
  getUsers,
  GetUsersParamsItems,
} from '../../../application/api/endpoints/users';

export type UpdateUserFormOnFindUser = {
  id: string;
  nome: string;
  email: string;
  rg: string;
  endereco: string;
  conta: boolean;
};

type ToastProps = {
  title: string;
  color: 'success' | 'danger';
  isOpenBootstrapToast: boolean;
};

export const useUpdateUsers = () => {
  const [users, setUsers] = useState<Array<GetUsersParamsItems>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<GetUsersParamsItems | null>(null);
  const [isOpenOffCanvas, setIsOpenOffCanvas] = useState<boolean>(false);
  const [isOpenOffCanvasModal, setIsOpenOffCanvasModal] =
    useState<boolean>(false);

  const [{ color, isOpenBootstrapToast, title }, setToast] =
    useState<ToastProps>({
      color: 'success',
      isOpenBootstrapToast: false,
      title: '',
    });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const onOpenDeleteModal = () => setIsOpenDeleteModal(true);
  const onCloseDeleteModal = () => setIsOpenDeleteModal(false);

  const onStartLoading = () => setLoading(true);
  const onStopLoading = () => setLoading(false);

  const onOpenBootstrapToast = (
    title: string,
    color: 'success' | 'danger' = 'success',
  ) => setToast({ color, isOpenBootstrapToast: true, title });

  const onCloseBootstrapToast = () =>
    setToast({ isOpenBootstrapToast: false, title: '', color: 'success' });

  const handleFindUser = async (values: UpdateUserFormOnFindUser) => {
    onStartLoading();
    await getUsers(values).then((response) => {
      onStopLoading();
      setUsers(response);
    });
  };

  const handleChangeUser = (usuario: GetUsersParamsItems) => setUser(usuario);

  const handleCloseOffCanvas = () => setIsOpenOffCanvas(false);

  const handleOpenOffCanvas = (usuario: GetUsersParamsItems) => {
    handleChangeUser(usuario);
    setIsOpenOffCanvas(true);
  };

  const handleOpenOffCanvasModal = () => setIsOpenOffCanvasModal(true);
  const handleCloseOffCanvasModal = () => setIsOpenOffCanvasModal(false);

  const handleOpenDeleteModal = (usuario: GetUsersParamsItems) => {
    setUser(usuario);
    onOpenDeleteModal();
  };

  return {
    data: {
      users,
      loading,
      isOpenOffCanvas,
      user,
      isOpenOffCanvasModal,
      color,
      isOpenBootstrapToast,
      title,
      isOpenDeleteModal,
    },
    functions: {
      handleFindUser,
      setUsers,
      setUser,
      handleOpenOffCanvas,
      handleCloseOffCanvas,
      handleChangeUser,
      handleOpenOffCanvasModal,
      handleCloseOffCanvasModal,
      onStartLoading,
      onStopLoading,
      onOpenBootstrapToast,
      onCloseBootstrapToast,
      onCloseDeleteModal,
      handleOpenDeleteModal,
    },
  };
};
