import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Container, Button, Typography } from '@material-ui/core';

import api from '../../services/api';
import history from '../../services/history';
import InputText from '../../components/InputText';

import useStyles from './styles';

export default function Payments({ location }) {
  const [values, setValues] = useState({
    nomeTitular: '',
    numeroCartao: '',
    validadeCartao: '',
    id: '',
  });

  const classes = useStyles();
  const {
    id,
    formaPagamento,
    prestador,
    agendamentoDeServico,
  } = location.state.service;

  const differenceDays = differenceInDays(
    new Date(agendamentoDeServico.dataInicio),
    new Date(agendamentoDeServico.dataFim)
  );

  function handleChange(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  async function handleClick() {
    try {
      await api.put('/contrato/servico/pagamento/cartao-de-credito', {
        nomeTitular: values.nomeTitular,
        numeroCartao: values.numeroCartao,
        validadeCartao: values.validadeCartao,
        formaPagamento: {
          id,
        },
      });

      toast.success(`Você pagou ${prestador.usuario.nome}`);
      history.push('/');
    } catch (error) {
      toast.error('Não foi possivel pagar o prestador');
    }
  }

  return (
    <Container className={classes.root} maxWidth="lg">
      {formaPagamento.boleto ? (
        <div className={classes.boleto}>
          <Typography gutterBottom variant="h5">
            {prestador.usuario.nome}
          </Typography>
          <Typography variant="h6">
            Preço R$ {Math.trunc(-differenceDays * prestador.servico.preco)}
            ,00
          </Typography>
          <img
            className={classes.codigo}
            src="https://ohsolucoes.com.br/blog/wp-content/uploads/2018/09/ean-13-1280x640.jpg"
            alt="codigo de barras"
          />
          <Button variant="contained" color="secondary">
            Pagar
          </Button>
        </div>
      ) : (
        <div className={classes.card}>
          <Typography gutterBottom variant="h5">
            Dados do cartão
          </Typography>
          <InputText
            label="Titular"
            name="nomeTitular"
            value={values.nomeTitular}
            setValue={handleChange}
          />
          <InputText
            label="Numero"
            name="numeroCartao"
            value={values.numeroCartao}
            setValue={handleChange}
            number
            length={16}
          />
          <InputText
            label="Validade. ex: 12/22"
            name="validadeCartao"
            value={values.validadeCartao}
            setValue={handleChange}
            length={5}
          />
          <Button onClick={handleClick} variant="contained" color="secondary">
            Pagar
          </Button>
        </div>
      )}
    </Container>
  );
}

Payments.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
