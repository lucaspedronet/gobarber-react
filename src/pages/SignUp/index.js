import React from 'react';
import { Link } from 'react-router-dom'

import Logo from '~/assets/logo.svg'
export default function SignUp() {
  return (
    <>
      <img src={Logo} alt="Gobarber" />
      <form>
        <input type="text" placeholder="Nome completo" />
        <input type="text" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha secreta" />
        <button type="submit">Cadastrar</button>
        <Link to="/" >Já tenho uma conta</Link>
      </form>
    </>
  );
}
