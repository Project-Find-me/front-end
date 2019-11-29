import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    height: '80%',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 400,
  },
  button: {
    margin: '20px 0',
  },
  logo: {
    width: 170,
  },
}));
