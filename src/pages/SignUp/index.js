import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { signUpRequest } from '~/store/modulos/auth/actions';

import Logo from '~/assets/logo.svg';

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
    phone: Yup.number().required(),
  });

  const dispatch = useDispatch();
  const [selectProvider, setSelectProvider] = useState('Select o profile...');

  function handleSubmit({ name, email, password, phone }) {
    dispatch(signUpRequest(name, email, password, phone, selectProvider));
  }
  function handleSelectProvider(data) {
    setSelectProvider(data.target.value);
  }

  return (
    <>
      <img src={Logo} alt="Gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="phone" type="number" placeholder="Telefone" />
        <select
          value={selectProvider}
          onChange={handleSelectProvider}
          id="provider"
        >
          <option selected name="Selecione" value="" id="opt-00">
            Selecione seu perfil...
          </option>
          <option name="provider" value="provider" id="opt-01">
            Provider
          </option>
          <option name="manager" value="manager" id="opt-02">
            Manager
          </option>
        </select>
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
