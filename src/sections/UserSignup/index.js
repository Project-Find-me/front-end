import React from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar } from '@material-ui/core';
import { AddAPhotoOutlined } from '@material-ui/icons';

import InputText from '../../components/InputText';

import useStyles from './styles';

export default function UserSignup({ values, setValues, next }) {
  const classes = useStyles();

  async function handleChangeImg(e) {
    const { files } = e.target;

    const file = files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: `${Math.round(file.size / 1000)} kB`,
        base64: reader.result,
        file,
      };

      setValues({
        ...values,
        imagem: { base64: fileInfo.base64, type: fileInfo.type },
      });
    };
  }

  async function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className={classes.root}>
      <label htmlFor="image">
        {values.imagem.base64 ? (
          <Avatar
            className={classes.avatar}
            src={values.imagem.base64}
            alt="imagem avatar"
          />
        ) : (
          <>
            <Avatar className={classes.avatar}>
              <AddAPhotoOutlined
                color="primary"
                fontSize="large"
                className={classes.icon}
              />
            </Avatar>
          </>
        )}

        <input
          hidden
          className={classes.input}
          type="file"
          id="image"
          accept="image/*"
          onChange={handleChangeImg}
        />
      </label>
      <InputText
        label="Seu nome"
        name="nome"
        value={values.nome}
        setValue={handleChange}
      />
      <InputText
        label="Seu email"
        name="email"
        value={values.email}
        setValue={handleChange}
      />
      <InputText
        label="Seu senha"
        name="senha"
        value={values.senha}
        setValue={handleChange}
        pass
      />

      <Button fullWidth color="primary" onClick={next} variant="contained">
        Proximo
      </Button>
    </div>
  );
}

UserSignup.propTypes = {
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  setValues: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
