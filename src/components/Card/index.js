import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';

import userImage from '../../assets/userImage.jpg';
import history from '../../services/history';
import useStyles from './styles';

export default function CardProvider({ provider }) {
  const { servico, usuario } = provider;
  const { signed } = useSelector(state => state.auth);
  const providerData = useSelector(state => state.auth.provider);
  const classes = useStyles();

  function handleClick() {
    history.push('/contract', { provider });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={usuario.imagemDiretorio ? usuario.imagemDiretorio : userImage}
          title="Foto prestador"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {usuario.nome}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            color="textSecondary"
            component="p"
          >
            {servico.nomeServico}
          </Typography>

          <Typography variant="body1" component="p">
            R$ {servico.preco} <small>por dia</small>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {signed ? (
          <>
            {providerData === undefined ? (
              <Button onClick={handleClick} size="small" color="primary">
                Solicitar serviço
              </Button>
            ) : null}
          </>
        ) : (
          <>
            <Button
              onClick={() => history.push('/signin')}
              size="small"
              color="primary"
            >
              Entrar
            </Button>
            <Button
              onClick={() => history.push('/signup')}
              size="small"
              color="primary"
            >
              Cadastrar-se
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

CardProvider.propTypes = {
  provider: PropTypes.objectOf(PropTypes.any).isRequired,
};
