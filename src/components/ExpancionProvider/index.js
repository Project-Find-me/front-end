import React from 'react';
import PropTypes from 'prop-types';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import history from '../../services/history';
import api from '../../services/api';
import useStyles from './styles';

export default function ExpancionProvider({ service }) {
  const classes = useStyles();
  const {
    agendamentoDeServico,
    usuario,
    statusDeContrato,
    formaPagamento,
    prestador,
  } = service;

  const initialFormatDate = format(
    new Date(agendamentoDeServico.dataInicio),
    "dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  const endFormatDate = format(
    new Date(agendamentoDeServico.dataFim),
    "dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  const differenceDays = differenceInDays(
    new Date(agendamentoDeServico.dataInicio),
    new Date(agendamentoDeServico.dataFim)
  );

  async function handleClick() {
    try {
      await api.put('contrato/servico/aceitar-contrato', { id: service.id });

      history.push('/schedule');
      toast.success('Você aceitou o serviço');
    } catch (error) {
      toast.error('Não foi possivel aceitar o serviço');
    }
  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Avatar src={usuario.imagemDiretorio} alt="Imagem Cliente" />
        <div className={classes.sumary}>
          <Typography variant="h6">{usuario.nome}</Typography>
          <Typography align="right" variant="body2" color="textSecondary">
            {initialFormatDate}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Typography>
          {usuario.nome} solicitou seus serviços do dia{' '}
          <strong>{initialFormatDate}</strong> até o dia{' '}
          <strong>{endFormatDate}</strong>, e vai pagar com{' '}
          {formaPagamento.boleto ? 'boleto' : 'cartão'} o valor total de{' '}
          <strong>
            R$ {Math.trunc(-differenceDays * prestador.servico.preco)},00
          </strong>
          .
        </Typography>
        <div className={classes.option}>
          {statusDeContrato ? (
            <Typography variant="body2" color="textSecondary">
              Você aceitou o serviço
            </Typography>
          ) : (
            <Button onClick={handleClick} variant="contained" color="primary">
              Aceitar
            </Button>
          )}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

ExpancionProvider.propTypes = {
  service: PropTypes.objectOf(PropTypes.any).isRequired,
};
