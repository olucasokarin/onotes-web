import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #3e3b47;
  height: 70px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #f4ede8;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  font-size: 2.2rem;
  font-weight: 300;

  &:hover {
    background: ${shade(0.3, '#3e3b47')};
  }
`;
