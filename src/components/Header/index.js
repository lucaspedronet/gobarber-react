import React from 'react';
import { Link } from 'react-router-dom';

import Notifications from 'components/Notifications';

import { useSelector } from 'react-redux';
import { Container, Content, Profile } from './styles';
import logo from '~/assets/logos/Web-11.svg';

export default function Header() {
  const account = useSelector((state) => state.account._profile.profiles);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard">Serviços</Link>
          <Link to="/dashboard">Clientes</Link>
          <Link to="/dashboard">Financeiro</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{account.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <Link to="/profile">
              <img
                src={
                  (account.avatar && account.avatar.url) ||
                  'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt={account.name}
              />
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
