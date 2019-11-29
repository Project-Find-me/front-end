import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';
import InputText from '../../components/InputText';
import SelectInput from '../../components/SelectInput';

import useStyles from './styles';

export default function ProviderSignup({ values }) {
  const classes = useStyles();
  const [select, setSelect] = useState('');
  const [providerData, setProviderData] = useState({
    telefone: '',
    rg: '',
    cpf: '',
    cnpj: '',
  });

  function handleChange(e) {
    setProviderData({ ...providerData, [e.target.id]: e.target.value });
  }

  async function handleClick() {
    const cep = values.cep.replace(/[^\d]+/g, '');

    const {
      nome,
      senha,
      email,
      bairro,
      cidade,
      imagem,
      rua,
      numero,
      uf,
    } = values;
    try {
      const { data } = await api.post('usuario', {
        nome,
        email,
        senha,
        imagem,
        endereco: {
          cep,
          cidade,
          uf,
          bairro,
          rua,
          numero,
        },
      });

      await api.post('prestador', {
        usuario: { id: data.id },
        servico: { id: select },
        telefone: parseInt(providerData.telefone, 10),
        cpf: parseInt(providerData.cpf, 10),
        rg: providerData.rg === '' ? null : parseInt(providerData.rg, 10),
        cnpj: providerData.cnpj === '' ? null : parseInt(providerData.cnpj, 10),
      });

      history.push('/signin');

      toast.success('Prestador criado com sucesso');
    } catch (error) {
      toast.error(
        'Não foi possivel se cadastrar, por favor tente novamente mais tarde'
      );
    }
  }

  return (
    <div className={classes.root}>
      <InputText
        label="Seu telefone"
        name="telefone"
        value={providerData.telefone}
        setValue={handleChange}
        number
      />

      <InputText
        label="RG"
        name="rg"
        value={providerData.rg}
        setValue={handleChange}
        number
      />

      <InputText
        label="CPF"
        name="cpf"
        value={providerData.cpf}
        setValue={handleChange}
        number
      />

      <InputText
        label="CNPJ"
        name="cnpj"
        value={providerData.cnpj}
        setValue={handleChange}
        number
      />

      <div className={classes.select}>
        <SelectInput initialLabel="Profissão" setFilter={setSelect} />
      </div>

      <Button
        onClick={handleClick}
        fullWidth
        color="primary"
        variant="contained"
      >
        Finalizar
      </Button>
    </div>
  );
}

ProviderSignup.propTypes = {
  values: PropTypes.objectOf(PropTypes.any).isRequired,
};
