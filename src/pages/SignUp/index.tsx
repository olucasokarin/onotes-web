import React, { useRef, useCallback } from 'react';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container, Content } from './styles';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleCreateAccount = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email required')
            .email('Enter a valid email address'),
          password: Yup.string().min(6),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Registration Success',
          description: 'You can now login',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Registration Error',
          description: 'An error occurred while registering, try again',
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleCreateAccount}>
          <h1>CREATE ACCOUNT</h1>

          <Input name="email" placeholder="E-mail" />
          <Input name="password" type="password" placeholder="Password" />

          <Button type="submit">CREATE</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft size={20} />I have an account
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
