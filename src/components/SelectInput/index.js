import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, NativeSelect } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function SelectInput({ setFilter, initialLabel }) {
  const { professions } = useSelector(state => state.professions);

  const handleChange = event => {
    setFilter(event.target.value);
  };

  return (
    <FormControl>
      <NativeSelect
        name="professions"
        onChange={handleChange}
        inputProps={{ 'aria-label': 'profissoes' }}
      >
        <option value="">{initialLabel}</option>

        {professions.map(item => (
          <option key={item.id} value={item.id}>
            {item.nomeServico}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

SelectInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
  initialLabel: PropTypes.string.isRequired,
};
