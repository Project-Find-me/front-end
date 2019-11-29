import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import logo from '../../assets/logo2.svg';
import useStyles from './styles';

export default function DescriptionFindme() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.darkBackground}>
        <Container className={classes.container} maxWidth="lg">
          <img className={classes.logo} src={logo} alt="Logo Find.me" />

          <Typography align="center" className={classes.text} variant="body1">
            lorem ipsum dolor sit amet consectetur adipiscing elit praesent
            risus elementum diam nullam vivamus aliquam dui per nam congue
            consequat imperdiet lobortis purus luctus ex
          </Typography>

          <Button variant="contained" color="secondary">
            <AnchorLink
              offset={() => 74}
              className={classes.link}
              href="#search"
            >
              Procurar prestadores
            </AnchorLink>
          </Button>
        </Container>
      </div>
    </div>
  );
}
