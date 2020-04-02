import React from 'react';
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'

import Logo from '~/assets/logo.svg'

export default function SignUp() {

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Nome deve conter no minímo de 5 caracteres!')
      .required('Nome é obrigatório!'),
    email: Yup.string()
      .email('Informe um e-mail válido!')
      .required('O e-mail é obrigatório!'),
    password: Yup.string()
      .min(6, 'Sua senha deve possuir no mínimo 6 cacacteres!')
      .required('Senha é obrigatória!'),
  })

  function handleSubmit(dados) {
    console.tron.log(dados)
  }

  return (
    <>
      <img src={Logo} alt="Gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha secreta" />
        <button type="submit">Criar conta</button>
        <Link to="/" >Já tenho login</Link>
      </Form>
    </>
  );
}
