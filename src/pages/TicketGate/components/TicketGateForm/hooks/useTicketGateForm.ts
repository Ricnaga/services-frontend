import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { getUserById } from '../../../../../application/api/endpoints/users';

export enum TicketGateFormFields {
  id = 'id',
}

export const useTicketGateForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setDisplayMessage(false);
    }, 5000);
  }, [displayMessage]);

  const formik = useFormik({
    initialValues: {
      [TicketGateFormFields.id]: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      await getUserById(values.id)
        .then(({ message }) => {
          setMessage(message);
          setDisplayMessage(true);
          setLoading(false);
        })
        .catch(() => {
          setMessage('Erro! usuário não permitido, verificar com a recepção');
          setDisplayMessage(true);
          setLoading(false);
        });
    },
  });

  return {
    data: {
      values: formik.values,
      loading,
      displayMessage,
      message,
    },
    functions: {
      onSubmit: formik.handleSubmit,
      onChange: formik.handleChange,
    },
  };
};
