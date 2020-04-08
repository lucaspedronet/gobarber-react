import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
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
      background: rgba(0, 0, 0, 0.1);
      height: 44px;
      border: 0px;
      border-radius: 4px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      align-self: stretch;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button {
      margin: 5px 0 5px;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0px;
      border-radius: 4px;
      align-self: stretch;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#3b9eff')};
      }
    }
  }
  > button {
    width: 100%;
    margin: 5px 0 0;
    height: 44px;
    background: #ff3333;
    font-weight: bold;
    color: #fff;
    border: 0px;
    border-radius: 4px;
    align-self: stretch;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.07, '#FF3333')};
    }
  }
`;

export const Linha = styled.hr`
  border: 0px;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 10px 0 10px;
`;
