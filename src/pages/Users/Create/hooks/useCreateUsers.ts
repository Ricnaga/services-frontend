import { useEffect, useState } from 'react';
import {
  GetPlansItems,
  getPlans,
} from '../../../../application/api/endpoints/plans';

type ToastProps = {
  title: string;
  color: 'success' | 'danger';
  isOpenPushNotification: boolean;
};

export const useCreateUsers = () => {
  const [pacotes, setPacotes] = useState<Array<GetPlansItems>>([]);
  const [{ color, isOpenPushNotification, title }, setToast] =
    useState<ToastProps>({
      color: 'success',
      isOpenPushNotification: false,
      title: '',
    });

  const onOpenPushNotification = (
    title: string,
    color: 'success' | 'danger' = 'success',
  ) => setToast({ color, isOpenPushNotification: true, title });

  const onClosePushNotification = () =>
    setToast({ isOpenPushNotification: false, title: '', color: 'success' });

  useEffect(() => {
    getPlans().then((response) => setPacotes(response));
  }, []);

  return {
    data: { pacotes, color, title, isOpenPushNotification },
    functions: { onOpenPushNotification, onClosePushNotification },
  };
};
