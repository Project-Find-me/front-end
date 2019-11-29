import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 180,
    height: 180,
  },
  radio: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  form: {
    margin: '20px 0',
  },
  button: {
    maxWidth: 400,
    marginBottom: 25,
  },
}));
