import React, { useState } from 'react';
import { Container, Button, Link } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';

import InputText from '../../components/InputText';
import useStyles from './styles';
import logo from '../../assets/logo2.svg';

export default function Signin() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    senha: '',
  });

  async function handleChange(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  function handleClick() {
    dispatch(signInRequest(values.email, values.senha));
  }

  return (
    <Container className={classes.root} maxWidth="lg">
      <div className={classes.form}>
        <img className={classes.logo} src={logo} alt="Logo Find.me" />
        <InputText
          setValue={handleChange}
          name="email"
          label="Seu email"
          value={values.email}
        />
        <InputText
          setValue={handleChange}
          name="senha"
          label="Sua Senha"
          pass
          value={values.senha}
        />

        <Button
          onClick={handleClick}
          fullWidth
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>

        <Link href="/signup">Não tem cadastro?</Link>
      </div>
    </Container>
  );
}
