/* eslint-disable import/extensions */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modulos/auth/actions';

import Logo from '~/assets/logo.svg';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Informe um e-mail válido!')
      .required('O e-mail é obrigatório!'),
    password: Yup.string()
      .min(6, 'Nome deve conter no mínimo 6 cacacteres!')
      .required('O nome é obrigatório!'),
  });

  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    // console.tron.log(email, password);
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={Logo} alt="Gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
