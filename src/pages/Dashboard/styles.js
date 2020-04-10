import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #bfbfbf;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 38px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #262626;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: ${darken(0.07, '#F23005')};
  }

  opacity: ${(props) => (props.past ? 0.3 : 1)};

  strong {
    display: block;
    color: ${(props) => (props.available ? '#BFBFBF' : '#D94F30')};
    font-size: 28px;
    font-weight: normal;

    &:hover {
      color: ${darken(0.07, '#BFBFBF')};
    }
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${(props) => (props.available ? '#BFBFBF' : '#D94F30')};

    &:hover {
      color: ${darken(0.07, '#BFBFBF')};
    }
  }
`;
