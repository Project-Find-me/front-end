import React, { useState, useEffect } from 'react';
import { Button, Grid, Container } from '@material-ui/core';
import { toast } from 'react-toastify';

import SelectInput from '../../components/SelectInput';
import Card from '../../components/Card';

import api from '../../services/api';
import useStyles from './styles';

function SearchProvider() {
  const [filter, setFilter] = useState('');

  const [providers, setProviders] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function loadProviders() {
      try {
        const { data } = await api.get('prestador/prestadores-random');

        setProviders([...data]);
      } catch (error) {
        toast.error('Não foi possivel carregar os prestadores');
      }
    }

    loadProviders();
  }, []);

  async function handleClick() {
    try {
      const { data } = await api.get(`prestador/servico/${filter}`);

      if (data.length === 0) {
        toast.warn('Não existe prestadores dessa categoria cadastrados');
      }

      setProviders(data);
    } catch (error) {
      toast.error('Não foi possivel carregar os prestadores');
    }
  }

  return (
    <section id="search" className={classes.root}>
      <div className={classes.select}>
        <SelectInput initialLabel="Todas" setFilter={setFilter} />
        <Button
          className={classes.button}
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          Filtrar
        </Button>
      </div>
      <Container maxWidth="lg">
        <Grid container>
          {providers.map(item => (
            <Grid key={item.id} item lg={4} md={6} sm={6} xl={6} xs={12}>
              <Card provider={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

export default SearchProvider;
