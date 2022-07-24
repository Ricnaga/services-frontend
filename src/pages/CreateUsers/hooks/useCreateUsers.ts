import { useEffect, useState } from 'react';
import {
  getPlans,
  GetPlansItems,
} from '../../../application/api/endpoints/plans';

type ToastProps = {
  title: string;
  color: 'success' | 'danger';
  isOpenBootstrapToast: boolean;
};

export const useCreateUsers = () => {
  const [pacotes, setPacotes] = useState<Array<GetPlansItems>>([]);
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

  useEffect(() => {
    getPlans().then((response) => setPacotes(response));
  }, []);

  return {
    data: { pacotes, color, title, isOpenBootstrapToast },
    functions: { onOpenBootstrapToast, onCloseBootstrapToast },
  };
};
