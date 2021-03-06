import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  ${(props) =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0px;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff892e;
        content: '';
        border-radius: 50%;
      }
    `}
`;

export const NotificationList = styled.div`
  position: absolute;
  width: 265px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);

  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 15px 5px;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: -20px;
    left: calc(50% - 30px);
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }

  display: ${(props) => (props.visible ? 'blok' : 'none')};
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #eee;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6px;
    margin-bottom: 5px;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }

  ${(props) =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        margin-left: 0;
        height: 6px;
        width: 6px;
        background: #ff892e;
        border-radius: 50%;
        border-left: 1px solid rgba(0, 0, 0, 0.13);
        margin-left: 10px;
      }
    `}
`;
