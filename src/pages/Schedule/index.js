import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from '@material-ui/core';

import ExpancionProvider from '../../components/ExpancionProvider';
import ExpancionClient from '../../components/ExpancionClient';
import api from '../../services/api';

import useStyles from './styles';

export default function Schedule() {
  const classes = useStyles();
  const { provider, user } = useSelector(state => state.auth);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      try {
        if (provider !== undefined) {
          const contract = await api.get(
            `prestador/lista-contratos/${provider.id}`
          );

          setServices(contract.data);
        } else {
          const { data } = await api.get(
            `usuario/lista-servico-contratados/${user.id}`
          );

          setServices(data);
        }
      } catch (error) {
        toast.error('Falha ao tentar carregar os dados');
      }
    }

    loadServices();
  }, [provider, user.id]);

  return (
    <Container className={classes.root} maxWidth="lg">
      {services.map(service =>
        provider !== undefined ? (
          <ExpancionProvider key={service.id} service={service} />
        ) : (
          <ExpancionClient key={service.id} service={service} />
        )
      )}
    </Container>
  );
}
