import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 22px;

  p {
    margin: 20px 0;
    color: #9aa0ae;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;

  height: 78px;

  background: #312e38;

  button {
    height: 42px;
    background: #3e3b47;
    border: 0;
    border-radius: 8px;
    padding: 0 26px;
    color: #f4ede8;

    /* margin: auto 22px auto auto; */
    margin: auto;
    margin-right: 22px;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.3, '#3e3b47')};
    }
  }

  button + button {
    margin-left: 0;
    background: #f15e5e;

    &:hover {
      background: ${shade(0.3, '#f15e5e')};
    }
  }
`;
