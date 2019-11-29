import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import isValidPhone from '@brazilian-utils/is-valid-phone';
import { isValidCpf } from '@brazilian-utils/is-valid-cpf';
import { isValidCnpj } from '@brazilian-utils/is-valid-cnpj';

import schema from '../../services/validateSchema';
import { checkValidation } from '../../services/validateField';

export default function InputText({
  value,
  label,
  setValue,
  name,
  pass,
  number,
  length,
}) {
  const [error, setError] = useState(false);

  useEffect(() => {
    async function validate() {
      switch (name) {
        case 'telefone':
          setError(!isValidPhone(value));
          break;
        case 'cpf':
          setError(!isValidCpf(value));
          break;
        case 'cnpj':
          setError(!isValidCnpj(value));
          break;
        default:
          setError(!(await checkValidation(name, value, schema)));
          break;
      }
    }

    if (value !== '') validate();
  }, [name, value]);

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function handleChange(e) {
    if (number) {
      if (isNumber(e.target.value) || e.target.value === '') setValue(e);
    } else {
      setValue(e);
    }
  }

  return (
    <TextField
      fullWidth
      error={error}
      id={name}
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      margin="normal"
      helperText={error ? 'Formato inválido' : null}
      type={pass ? 'password' : null}
      inputProps={{
        maxLength: length,
      }}
    />
  );
}

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  pass: PropTypes.bool,
  number: PropTypes.bool,
  length: PropTypes.number,
};

InputText.defaultProps = {
  pass: false,
  number: false,
  length: null,
};
