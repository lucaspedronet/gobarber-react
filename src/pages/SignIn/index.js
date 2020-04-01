import React from 'react';
import { Link } from 'react-router-dom'

import Logo from '~/assets/logo.svg'
export default function SignIn() {
  return (
    <>
      <img src={Logo} alt="Gobarber" />
      <form>
        <input type="text" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha secreta" />
        <button type="submit">Acessar</button>
        <Link to="/register" >Criar conta gratuita</Link>
      </form>
    </>
  );
}
