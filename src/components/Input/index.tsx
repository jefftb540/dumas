import { InputHTMLAttributes } from 'react';
import { Container } from './styled';
import { Field } from 'formik';
import { IconType } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
}

export function Input({ name, type, placeholder, Icon, ...props }: InputProps) {
  return (
    <Container>
      <Icon />
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </Container>
  );
}
