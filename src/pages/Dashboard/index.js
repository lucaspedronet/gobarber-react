import React from 'react';
import api from '~/services/api';
// import { Container } from './styles';

export default function Darshboard() {
  api.get(`/v1/users`);
  return <h1>Darshboard</h1>;
}
