import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { Container } from './style';

interface Inputprops extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<Inputprops> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon />}
    <input type="text" {...rest} />
  </Container>
);

export default Input;
