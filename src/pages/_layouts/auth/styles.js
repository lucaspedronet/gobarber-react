import styled from 'styled-components';
import { darken } from 'polished'

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15px;

    input {
      background: rgba(0,0,0,0.1);
      height: 44px;
      border: 0px;
      border-radius: 4px;
      padding: 0 15px;
      color: #FFF;
      margin: 0 0 10px;
      align-self: stretch;

      &::placeholder {
        color: rgba(255,255,255,.7)
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #FFF;
      border: 0px;
      border-radius: 4px;
      align-self: stretch;
      transition: background .2s;

      &:hover {
        background: ${darken(0.07, '#3b9eff')}
      }
    }

    a {
      text-decoration: none;
      font-size: 16px;
      color: #FFF;
      margin-top: 15px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }

    }
  }
`;
