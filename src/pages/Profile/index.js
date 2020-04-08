import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequest } from '~/store/modulos/account/actions';

import { Container, ContainerForm, Linha } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  account._profile.phone = account._profile.profiles.phone;
  account._profile.name = account._profile.profiles.name;

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));

    console.tron.log(data);
  }

  function signOut() {}
  return (
    <Container>
      <ContainerForm>
        <Form initialData={account._profile} onSubmit={handleSubmit}>
          <Input name="name" type="txt" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="Seu email" />
          <Input name="username" type="text" placeholder="Nome de usuário" />
          <Input name="phone" type="text" placeholder="Telefone" />

          <Linha />

          <Input
            name="oldPassword"
            type="password"
            placeholder="Sua senha atual"
          />
          <Input name="password" type="password" placeholder="Nova senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="confirmar senha"
          />

          <button type="submit">Atualizar perfil</button>
        </Form>
        <button type="button" onClick={signOut}>
          Sair GoBarber
        </button>
      </ContainerForm>
    </Container>
  );
}
