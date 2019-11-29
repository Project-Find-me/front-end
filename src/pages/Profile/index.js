import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Avatar, Typography } from '@material-ui/core';

import useStyles from './styles';

export default function Profile() {
  const classes = useStyles();
  const { user } = useSelector(state => state.auth);
  return (
    <Container className={classes.root} maxWidth="lg">
      <div className={classes.content}>
        <Avatar
          className={classes.avatar}
          src={user.imagemDiretorio}
          alt="imagem usuario"
        />
        <Typography gutterBottom variant="h5">
          {user.nome}
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary">
          {user.email}
        </Typography>
        <Typography variant="body1">
          CEP: {user.endereco.cep}
          <br />
          Cidade: {user.endereco.cidade}
          <br />
          Estado: {user.endereco.uf}
          <br />
          Bairro: {user.endereco.bairro}
          <br />
          Rua: {user.endereco.rua}
          <br />
          N°: {user.endereco.numero}
          <br />
        </Typography>
      </div>
    </Container>
  );
}
