import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequest } from '~/store/modulos/account/actions';
import { signOutRequest } from '~/store/modulos/auth/actions';

import AvatarInput from './components/AvatarInput';
import { Container, ContainerForm, Linha } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const account = useSelector((state) => ({
    ...state.account._profile,
    ...(state.account._profile.profiles
      ? {
          phone: state.account._profile.profiles.phone,
          name: state.account._profile.profiles.name,
          avatar: state.account._profile.profiles.avatar,
        }
      : {}),
  }));

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));

    console.tron.log(data);
  }

  function signOut() {
    dispatch(signOutRequest());
  }

  return (
    <Container>
      <ContainerForm>
        <Form initialData={account} onSubmit={handleSubmit}>
          <AvatarInput name="avatar_id" />
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
