import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  height: 100%;

  & + div {
    margin-top: 10px;
  }

  textarea {
    flex: 1;
    height: 100%;
    border-radius: 10px;
    border-color: #c4c4c4;
    background: transparent;
    color: #fff;

    font-size: 2.2rem;
    padding: 16px;

    resize: none;

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
  }
`;
