import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const ContainerForm = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;
  flex-direction: column;
  margin-top: 20px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;

    input {
      background: #262626;
      height: 44px;
      border: 0px;
      border-radius: 4px;
      padding: 0 15px;
      color: rgba(217, 79, 48, 0.7);
      margin: 0 0 10px;
      align-self: stretch;

      &::placeholder {
        color: rgba(217, 79, 48, 0.7);
      }
    }

    button {
      margin: 20px 0 0;
      height: 44px;
      background: #d94f30;
      font-weight: bold;
      color: #fff;
      border: 0px;
      border-radius: 4px;
      align-self: stretch;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#F23005')};
      }
    }
  }
  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #262626;
    font-weight: bold;
    color: #fff;
    border: 0px;
    border-radius: 4px;
    align-self: stretch;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.07, '#262626')};
    }
  }
`;

export const Linha = styled.hr`
  border: 0px;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 10px 0 10px;
`;
