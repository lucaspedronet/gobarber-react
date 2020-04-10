import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #201f25, #171719);
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
    margin-top: 25px;

    input {
      background: #24232b;
      height: 44px;
      border: 0px;
      border-radius: 4px;
      padding: 0 15px;
      color: #bfbfbf;
      margin: 0 0 10px;
      align-self: stretch;

      &::placeholder {
        color: #bfbfbf;
      }
    }

    select {
      background: rgba(0, 0, 0, 0.1);
      height: 44px;
      border: 0px;
      border-radius: 4px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      align-self: stretch;

      display: inline-block;
      font-size: 12;
      font-weight: normal;
      line-height: 1;
      min-width: 1;
      padding: 0.16666666666667em 0.5em;
      text-align: center;
    }

    span {
      color: #fd8f01;
      align-self: flex-start;
      margin: 0 0 15px;
      font-size: 12px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #fd8f01;
      font-weight: bold;
      color: #fff;
      border: 0px;
      border-radius: 4px;
      align-self: stretch;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#FD8F01')};
      }
    }

    a {
      text-decoration: none;
      font-size: 16px;
      color: #fd8f01;
      margin-top: 15px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
