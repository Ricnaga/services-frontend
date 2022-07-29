import { useEffect, useState } from 'react';
import {
  GetUserImages,
  getUserImages,
} from '../../../application/api/endpoints/users';
import {
  ToastActionType,
  useToast,
} from '../../../shared/components/BootstrapToast/hooks/useToast';

export const useHome = () => {
  const [images, setImages] = useState<Array<GetUserImages>>([]);
  const {
    data: { title, color, isOpen },
    functions: { toastAsOpen },
  } = useToast();

  const openToast = (toastTitle: string) =>
    toastAsOpen({
      action: ToastActionType.OPEN,
      payload: {
        toastColor: 'danger',
        toastTitle,
      },
    });

  const closeToast = () =>
    toastAsOpen({
      action: ToastActionType.CLOSE,
      payload: {},
    });

  useEffect(() => {
    getUserImages()
      .then((response) => setImages(response ?? []))
      .catch(() => openToast('Erro ao buscar imagens!'));
  }, []);

  return {
    data: { images, title, color, isOpen },
    functions: { closeToast },
  };
};
