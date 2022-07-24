import { useReducer } from 'react';

export const delayTime = 3000;

export enum ToastActionType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

type ToastState = {
  isOpen: boolean;
  title: string | null;
  color?: 'success' | 'danger';
  delay?: number;
};

type ToastAction = {
  action: ToastActionType;
  payload: ToastState;
};

const openConfig = (
  state: ToastState,
  {
    action,
    payload: { color = 'success', title, delay = delayTime },
  }: ToastAction,
) => {
  switch (action) {
    case ToastActionType.OPEN:
      return {
        isOpen: true,
        title,
        color,
        delay,
      };
    case ToastActionType.CLOSE:
      return {
        isOpen: false,
        title: null,
        color,
        delay,
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
  return {
    data: { color, isOpen, title, delay },
    functions: { toastAsOpen: dispatch },
  };
};
