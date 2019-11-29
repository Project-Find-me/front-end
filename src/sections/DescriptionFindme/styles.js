import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../../assets/background.jpg';

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    height: '90vh',
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover',
  },
  darkBackground: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
  },
  text: {
    maxWidth: 550,
    color: '#fff',
    margin: '40px 0',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
}));
