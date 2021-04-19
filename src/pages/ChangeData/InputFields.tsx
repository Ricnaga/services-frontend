import {
  HiOutlineDocument,
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlineUser,
} from 'react-icons/hi';
import Input from '../../components/Input';

interface InputFieldsProps {
  name: string;
  rg: string;
  address: string;
  email: string;
}

export default function InputFields({
  name,
  rg,
  address,
  email,
}: InputFieldsProps) {
  return (
    <>
      <Input
        name="name"
        icon={HiOutlineUser}
        placeholder="Nome"
        defaultValue={name}
      />
      <Input
        name="rg"
        icon={HiOutlineDocument}
        placeholder="RG"
        defaultValue={rg}
      />
      <Input
        name="address"
        icon={HiOutlineGlobe}
        placeholder="Endereço"
        defaultValue={address}
      />
      <Input
        name="email"
        icon={HiOutlineMail}
        placeholder="E-mail"
        defaultValue={email}
      />
    </>
  );
}
