import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  select: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 10px',
  },
}));
