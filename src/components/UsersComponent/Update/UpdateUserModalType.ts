export interface UsersFound {
  id: string;
  nome: string;
  rg: string;
  endereco: string;
  email: string;
  conta: boolean;
  created_at: Date;
}

export enum ModalModel {
  CONFIRMAR = 'CONFIRMAR',
  EXCLUIR = 'EXCLUIR',
}

export type ConfirmationModalProps = {
  user: UsersFound;
  onModalClose: () => void;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
  onHideOffCanvasClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<UsersFound[] | null>>;
};

export type DeleteModalProps = {
  onModalClose: () => void;
  user: UsersFound;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
  setUsers: React.Dispatch<React.SetStateAction<UsersFound[] | null>>;
};

export interface UpdateUserModalProps {
  tipo: string;
  user: UsersFound;
  handleModal: () => void;
  handleOffCanvas: () => void;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
  setUsers: React.Dispatch<React.SetStateAction<UsersFound[] | null>>;
}
