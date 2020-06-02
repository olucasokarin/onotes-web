import styled from 'styled-components';

export const Container = styled.div`
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
    border-bottom: 2px solid #e5e5e5;
    background: transparent;
    color: #f4ede8;
    padding: 5px;
    font-size: 1.8rem;

    &::placeholder {
      color: #c2c2c2;
      font-size: 1.8rem;
    }
  }
`;
