import styled from 'styled-components';
import { shade } from 'polished';

interface NoteItemProps {
  selected: boolean;
}

interface CategoryItemProps {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.header`
  height: 145px;
  width: 100%;
  background: #28262e;
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* padding: 0 80px; */

    max-width: 1250px;
    width: 95%;

    div {
      button {
        display: flex;
        align-items: center;

        background: transparent;
        border: 0;
        color: #f4ede8;

        > svg {
          margin-left: 12px;
        }
      }
    }
  }
`;

export const ContainerNotes = styled.div`
  padding: 50px 0;

  display: flex;
  flex-direction: row;

  max-width: 1250px;
  width: 95%;
`;

export const ListCategories = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 270px;

  button {
    align-self: center;
    background: #3e3b47;

    margin-bottom: 14px;

    border-radius: 10px;
    border: 0;
    padding: 16px 60px;
    color: #f4ede8;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.3, '#3e3b47')};
    }
  }
`;

export const CategoryItem = styled.div<CategoryItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => (props.selected ? '#28262e' : '#3e3b47')};
  color: #fff;
  border: 0;
  width: 270px;
  height: 60px;
  padding: 0 15px 0 36px;

  border-radius: 5px;

  & + div {
    margin-top: 5px;
  }
`;

export const ListNotes = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  min-width: 270px;

  /* height: 80vh; */

  button {
    align-self: center;
    background: #3e3b47;

    margin-bottom: 14px;

    border-radius: 10px;
    border: 0;
    padding: 16px 60px;
    color: #f4ede8;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.3, '#3e3b47')};
    }
  }
`;

export const NoteItem = styled.div<NoteItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${props => (props.selected ? '#3e3b47' : '#28262e')};

  width: 270px;
  height: 60px;
  padding: 0 36px;

  border-radius: 5px;

  span {
    color: #a5a7ab;
    font-size: 12px;
    margin-top: 5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & + div {
    margin-top: 5px;
  }
`;

export const NoteContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 100vw;
  height: calc(100vh - 215px);

  margin-left: 40px;

  form {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  span {
    margin-bottom: 10px;
    color: #9a9494;
    font-size: 1.4rem;
  }

  div {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  button {
    background: transparent;

    border: 0;
    color: #f4ede8;
    transition: background-color 0.2s;

    &:hover {
      svg {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  button + button {
    background: #3e3b47;
    border-radius: 10px;
    border: 0;
    padding: 16px;
    color: #f4ede8;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.3, '#3e3b47')};
      color: ${shade(0.2, '#f4ede8')};
    }
  }
  /* img {
    display: flex;

    align-self: flex-end;
    justify-self: end;
    width: 300px;
  } */
`;
