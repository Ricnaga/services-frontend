import { useReducer } from 'react';

export const delayTime = 3000;

export enum ToastActionType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

type ToastState = {
  isOpen: boolean;
  title: string | null;
  color: 'success' | 'danger';
  delay: number;
};

type ToastAction = {
  action: ToastActionType;
  payload: {
    toastTitle?: string | null;
    toastColor?: 'success' | 'danger';
    toastDelay?: number;
  };
};

const openConfig = (
  state: ToastState,
  {
    action,
    payload: {
      toastColor = 'success',
      toastTitle = null,
      toastDelay = delayTime,
    },
  }: ToastAction,
) => {
  switch (action) {
    case ToastActionType.OPEN:
      return {
        isOpen: true,
        title: toastTitle,
        color: toastColor,
        delay: toastDelay,
      };
    case ToastActionType.CLOSE:
      return {
        isOpen: false,
        title: null,
        color: toastColor,
        delay: delayTime,
      };
    default:
      return state;
  }
};

export const useToast = () => {
  const [{ color, isOpen, title, delay }, dispatch] = useReducer(openConfig, {
    isOpen: false,
    title: null,
    color: 'success',
    delay: delayTime,
  });

  const openToast = (
    toastTitle: string,
    toastColor: 'success' | 'danger' = 'success',
  ) =>
    dispatch({
      action: ToastActionType.OPEN,
      payload: { toastColor, toastTitle },
    });

  const closeToast = () =>
    dispatch({ action: ToastActionType.CLOSE, payload: {} });

  return {
    data: { color, isOpen, title, delay },
    functions: { toastAsOpen: dispatch, openToast, closeToast },
  };
};
