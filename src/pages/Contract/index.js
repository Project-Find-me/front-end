import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { differenceInDays, addDays } from 'date-fns';
import {
  Container,
  Avatar,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import history from '../../services/history';
import api from '../../services/api';
import useStyles from './styles';

export default function Contract({ location }) {
  const classes = useStyles();
  const { id } = useSelector(state => state.auth.user);
  const { servico, usuario } = location.state.provider;
  const { provider } = location.state;
  const [initialDate, setInitialDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [boleto, setBoleto] = useState(false);
  const [cartao, setCartao] = useState(false);

  const handleInitialDateChange = date => {
    setInitialDate(date);
  };

  const differenceDays = differenceInDays(
    new Date(initialDate),
    new Date(endDate)
  );

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handlePayChange = e => {
    if (e.target.value === 'boleto') {
      setBoleto(true);
      setCartao(false);
    } else {
      setCartao(true);
      setBoleto(false);
    }
  };

  const handleClick = async () => {
    try {
      await api.post('contrato/servico', {
        usuario: {
          id,
        },
        prestador: {
          id: provider.id,
        },
        agendamentoDeServico: {
          dataInicio: new Date(initialDate).toISOString(),
          dataFim: new Date(endDate).toISOString(),
        },
        formaPagamento: {
          cartaoDeCredito: cartao,
          boleto,
        },
      });

      history.push('/');

      toast.success(`Você solicitou o prestador ${usuario.nome}`);
    } catch (error) {
      toast.error('Problema ao tentar solicitar o serviço');

      history.push('/');
    }
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Avatar
          className={classes.avatar}
          src={usuario.imagemDiretorio}
          alt="Image prestador"
        />

        <Typography gutterBottom variant="h4">
          {usuario.nome}
        </Typography>

        <Typography gutterBottom variant="body1" color="textSecondary">
          {servico.nomeServico}
        </Typography>

        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <KeyboardDatePicker
                margin="normal"
                label="Começa"
                format="dd/MM/yyyy"
                minDate={new Date()}
                value={initialDate}
                onChange={handleInitialDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item>
              <KeyboardDatePicker
                margin="normal"
                label="Acaba"
                format="dd/MM/yyyy"
                minDate={addDays(new Date(), 1)}
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>

        <FormControl
          className={classes.form}
          component="fieldset"
          margin="dense"
          fullWidth
        >
          <Typography
            gutterBottom
            align="center"
            variant="h5"
            color="textSecondary"
          >
            Forma de Pagamento
          </Typography>
          <RadioGroup
            className={classes.radio}
            aria-label="position"
            name="position"
            onChange={handlePayChange}
            row
          >
            <FormControlLabel
              value="cartao"
              control={<Radio color="primary" />}
              label="Cartão"
              labelPlacement="start"
            />
            <FormControlLabel
              value="boleto"
              control={<Radio color="primary" />}
              label="Boleto"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          fullWidth
          className={classes.button}
        >
          Solicitar serviço R$ {Math.trunc(-differenceDays * servico.preco)},00
        </Button>
      </div>
    </Container>
  );
}

Contract.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
