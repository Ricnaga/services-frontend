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
  loading: boolean;
  onConfirmationModalClose: () => void;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
  onHideOffCanvasClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<UsersFound[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeleteModalProps = {
  onDeleteModalClose: () => void;
  user: UsersFound;
  loading: boolean;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
  setUsers: React.Dispatch<React.SetStateAction<UsersFound[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface UpdateUserModalProps {
  tipo: string;
  user: UsersFound;
  loading: boolean;
  onCloseUpdateUserModal: () => void;
  handleOffCanvas: () => void;
  onPushNotification: (
    newTitle: string,
    newColor: 'success' | 'danger',
  ) => void;
  setUsers: React.Dispatch<React.SetStateAction<UsersFound[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
