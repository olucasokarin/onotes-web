import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container, Content } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Content>
        <Form
          ref={formRef}
          onSubmit={() => {
            console.log('');
          }}
        >
          <h1>CREATE ACCOUNT</h1>

          <Input name="email" placeholder="E-mail" />
          <Input name="password" placeholder="Password" />

          <Button type="submit">CREATE</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />I have an account
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
