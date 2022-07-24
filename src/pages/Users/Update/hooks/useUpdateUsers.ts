import { useState } from 'react';
import {
  getUsers,
  GetUsersParamsItems,
} from '../../../../application/api/endpoints/users';

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
  isOpenPushNotification: boolean;
};

export const useUpdateUsers = () => {
  const [users, setUsers] = useState<Array<GetUsersParamsItems>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<GetUsersParamsItems | null>(null);
  const [isOpenOffCanvas, setIsOpenOffCanvas] = useState<boolean>(false);
  const [isOpenOffCanvasModal, setIsOpenOffCanvasModal] =
    useState<boolean>(false);

  const [{ color, isOpenPushNotification, title }, setToast] =
    useState<ToastProps>({
      color: 'success',
      isOpenPushNotification: false,
      title: '',
    });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const onOpenDeleteModal = () => setIsOpenDeleteModal(true);
  const onCloseDeleteModal = () => setIsOpenDeleteModal(false);

  const onStartLoading = () => setLoading(true);
  const onStopLoading = () => setLoading(false);

  const onOpenPushNotification = (
    title: string,
    color: 'success' | 'danger' = 'success',
  ) => setToast({ color, isOpenPushNotification: true, title });

  const onClosePushNotification = () =>
    setToast({ isOpenPushNotification: false, title: '', color: 'success' });

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
      isOpenPushNotification,
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
      onOpenPushNotification,
      onClosePushNotification,
      onCloseDeleteModal,
      handleOpenDeleteModal,
    },
  };
};
