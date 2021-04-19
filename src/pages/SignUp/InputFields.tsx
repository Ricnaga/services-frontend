import {
  HiOutlineDocument,
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlineUser,
} from 'react-icons/hi';
import Input from '../../components/Input';

export default function InputFields() {
  return (
    <>
      <Input name="name" icon={HiOutlineUser} placeholder="Nome" />
      <Input name="rg" icon={HiOutlineDocument} placeholder="RG" />
      <Input name="address" icon={HiOutlineGlobe} placeholder="Endereço" />
      <Input name="email" icon={HiOutlineMail} placeholder="E-mail" />
    </>
  );
}
