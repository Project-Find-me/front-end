import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { signUpRequest } from '../../store/modules/auth/actions';

import useStyles from './styles';

export default function ChoiceSignup({ next, values }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(signUpRequest({ values }));
  }

  return (
    <Grid className={classes.grid} justify="center" spacing={3} container>
      <Grid item md={5}>
        <Typography gutterBottom align="center" variant="h5">
          Prestador
        </Typography>
        <Typography
          gutterBottom
          align="center"
          variant="body2"
          color="textSecondary"
        >
          orem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          accumsan.
        </Typography>

        <Button
          className={classes.button}
          onClick={next}
          variant="text"
          fullWidth
          color="primary"
        >
          Prestador
        </Button>
      </Grid>
      <Grid item md={5}>
        <Typography gutterBottom align="center" variant="h5">
          Cliente
        </Typography>
        <Typography
          gutterBottom
          align="center"
          variant="body2"
          color="textSecondary"
        >
          orem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          accumsan.
        </Typography>

        <Button
          className={classes.button}
          onClick={handleClick}
          variant="text"
          fullWidth
          color="primary"
        >
          Cliente
        </Button>
      </Grid>
    </Grid>
  );
}

ChoiceSignup.propTypes = {
  next: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
};
