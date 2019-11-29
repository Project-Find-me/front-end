import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from '@material-ui/core';

import InputText from '../../components/InputText';

import useStyles from './styles';

export default function AddressSignup({ values, setValues, next }) {
  const classes = useStyles();

  async function loadAddress() {
    const { data } = await axios.get(
      `http://apps.widenet.com.br/busca-cep/api/cep/${values.cep}.json`
    );

    setValues({
      ...values,
      cep: data.code,
      cidade: data.city,
      rua: data.address,
      bairro: data.district,
      uf: data.state,
    });
  }

  async function handleChange(e) {
    if (e.target.id === 'cep' && e.target.value.length === 8) loadAddress();

    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className={classes.root}>
      <InputText
        label="Seu CEP"
        name="cep"
        value={values.cep}
        setValue={handleChange}
        number
        length={8}
      />
      <InputText
        label="Sua cidade"
        name="cidade"
        value={values.cidade}
        setValue={handleChange}
      />
      <InputText
        label="UF"
        name="uf"
        value={values.uf}
        setValue={handleChange}
      />
      <InputText
        label="Seu bairro"
        name="bairro"
        value={values.bairro}
        setValue={handleChange}
      />
      <InputText
        label="Sua rua"
        name="rua"
        value={values.rua}
        setValue={handleChange}
      />
      <InputText
        label="N°"
        name="numero"
        value={values.numero}
        setValue={handleChange}
        number
        length={4}
      />

      <Button fullWidth color="primary" onClick={next} variant="contained">
        Proximo
      </Button>
    </div>
  );
}

AddressSignup.propTypes = {
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  setValues: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
