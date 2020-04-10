import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #0d0d0d, #262626);
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
      background: #262626;
      height: 44px;
      border: 0.4px solid #f23005;
      border-radius: 4px;
      padding: 0 15px;
      color: rgba(217, 79, 48, 0.7);
      margin: 0 0 10px;
      align-self: stretch;

      &::placeholder {
        color: rgba(217, 79, 48, 0.7);
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
      color: #d94f30;
      align-self: flex-start;
      margin: 0 0 15px;
      font-size: 12px;
    }

    button {
      margin: 5px 0 0;
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

    a {
      text-decoration: none;
      font-size: 16px;
      color: #d94f30;
      margin-top: 15px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
