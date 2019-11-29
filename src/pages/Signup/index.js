import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Container } from '@material-ui/core';

import UserSignup from '../../sections/UserSignup';
import AddressSignup from '../../sections/AddressSignup';
import ChoiceSignup from '../../sections/ChoiceSignup';
import ProviderSignup from '../../sections/ProviderSignup';
import useStyles from './styles';

function getSteps() {
  return ['', '', '', ''];
}

function HorizontalStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    nome: '',
    email: '',
    senha: '',
    imagem: {},
    cep: '',
    cidade: '',
    uf: '',
    bairro: '',
    rua: '',
    numero: '',
  });

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <UserSignup values={values} setValues={setValues} next={handleNext} />
        );
      case 1:
        return (
          <AddressSignup
            values={values}
            setValues={setValues}
            next={handleNext}
          />
        );
      case 2:
        return <ChoiceSignup values={values} next={handleNext} />;
      default:
        return <ProviderSignup values={values} />;
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Container>
          <div className={classes.content}>{getStepContent(activeStep)}</div>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Voltar
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default HorizontalStepper;
