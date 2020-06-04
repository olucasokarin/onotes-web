import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
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
          <h1>LOGON</h1>
          <p>Yours notes in anywhere</p>

          <Input name="email" placeholder="E-mail" />
          <Input name="password" placeholder="Password" />

          <Button type="submit">LOGIN</Button>

          <Link to="forgot-password">Forgot my password</Link>
        </Form>

        <Link to="signup">Create an account</Link>
      </Content>
    </Container>
  );
};

export default SignIn;