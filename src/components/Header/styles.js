import styled from 'styled-components';

export const Container = styled.div`
  background: #171719;
  box-shadow: 0 1px 8px 0px rgba(243, 247, 251, 0.5);
  width: 100%;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: 400;
      font-size: 13px;
      color: #f3f7fb;
      background: #444857;
      text-decoration: none;
      padding: 7px;
      border-radius: 4px;
      margin-right: 10px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #f3f7fb;
    }

    a {
      display: block;
      margin-top: 5px;
      font-size: 12px;
      color: #acaebb;
    }
  }

  img {
    width: 45px;
    height: 45px;
    border: 1.5px solid #eee;
    border-radius: 50%;
  }
`;
