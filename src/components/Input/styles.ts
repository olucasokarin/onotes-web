import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;

  & + div {
    margin-top: 10px;
  }

  input {
    flex: 1;
    border: 0;
    height: 35px;
    width: 100%;
    border-bottom: 2px solid #e5e5e5;
    background: transparent;
    color: #f4ede8;
    padding: 5px;
    font-size: 1.8rem;

    ${props =>
      props.isErrored &&
      css`
        border-bottom: 2px solid #c53030;
        border-color: #c53030;
      `}

    ${props =>
      props.isFocused &&
      css`
        border-color: #ff9000;
      `}

      ${props =>
        props.isFilled &&
        css`
          border-color: #ff9000;
        `}


    /* &::placeholder {
      color: #c2c2c2;
      font-size: 1.8rem;
    } */
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
