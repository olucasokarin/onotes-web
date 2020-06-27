import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #28262e;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  max-width: 720px;
  height: 90%;
  max-height: 680px;
  background: #312e38;
  border-radius: 10px;

  form {
    margin: 60px 0;
    width: 95%;
    max-width: 450px;
    text-align: center;

    h1 {
      font-weight: 300;
      margin-bottom: 80px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 1.8rem;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #f4ede8;
    margin-top: 24px;
    font-size: 2rem;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
