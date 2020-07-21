import styled, { keyframes } from 'styled-components';
import { Form as Unform } from '@unform/web';
import { shade } from 'polished';

interface ContainerDeleteProps {
  visible: boolean;
}

export const Form = styled(Unform)`
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 30px 30px 0;

    h2 {
      font-weight: 500;
      line-height: 36px;
    }
    > button {
      background: transparent;
      border: 0;
      color: #f4ede8;
      transition: background-color 0.2s;

      &:hover {
        svg {
          color: ${shade(0.3, '#f4ede8')};
        }
      }
    }
  }

  input {
    margin-bottom: 40px;
  }

  button {
    font-weight: 500;
    background: #312e38;
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
    /* background: #f15e5e; */

    /* &:hover {
      background: ${shade(0.3, '#f15e5e')};
    } */
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 22px;

  p {
    margin: 20px 0;
    color: #9aa0ae;
  }
`;

const appearFromTop = keyframes`
  from{
    opacity: 0;
    transform: translateY(50px);
  },
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ContainerDelete = styled.div<ContainerDeleteProps>`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  animation: ${appearFromTop} 0.4s;

  button {
    background: #f15e5e;

    &:hover {
      background: ${shade(0.3, '#f15e5e')};
    }
  }
  button + button {
    margin-left: 0;
    background: #3e3b47;

    &:hover {
      background: ${shade(0.3, '#3e3b47')};
    }
  }
`;
