import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 30px;

  h2 {
    font-weight: 600;
    line-height: 36px;
    margin-bottom: 40px;
  }

  button {
    margin-top: 48px;
    font-weight: 500;
    background: #312e38;
  }
`;
