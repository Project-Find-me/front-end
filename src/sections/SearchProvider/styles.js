import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: '100vh',
  },
  select: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 10px',
  },
  button: {
    marginLeft: 20,
  },
}));
