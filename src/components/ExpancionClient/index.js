import React from 'react';
import PropTypes from 'prop-types';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

import useStyles from './styles';

export default function ExpancionClient({ service }) {
  const classes = useStyles();
  const {
    agendamentoDeServico,
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

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Avatar src={prestador.usuario.imagemDiretorio} alt="Imagem Cliente" />
        <div className={classes.sumary}>
          <Typography variant="h6">
            {prestador.usuario.nome}
            <small className={classes.small}>
              {prestador.servico.nomeServico}
            </small>
          </Typography>
          <Typography align="right" variant="body2" color="textSecondary">
            {initialFormatDate}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Typography>
          Você soliciou os serviços de <strong>{prestador.usuario.nome}</strong>{' '}
          do dia <strong>{initialFormatDate}</strong> até o dia{' '}
          <strong>{endFormatDate}</strong>, e escolheu pagar com{' '}
          {formaPagamento.boleto ? 'boleto' : 'cartão'} o valor total de{' '}
          <strong>
            R$ {Math.trunc(-differenceDays * prestador.servico.preco)},00
          </strong>
          .
        </Typography>
        <div className={classes.option}>
          {!statusDeContrato ? (
            <Typography variant="body2" color="textSecondary">
              Aguardando prestador aceitar o serviço
            </Typography>
          ) : (
            <Button
              onClick={() => history.push('/payments', { service })}
              variant="contained"
              color="primary"
            >
              Pagar
            </Button>
          )}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

ExpancionClient.propTypes = {
  service: PropTypes.objectOf(PropTypes.any).isRequired,
};
