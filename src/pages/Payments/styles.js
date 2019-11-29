import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  codigo: {
    width: '100%',
    maxWidth: 400,
    margin: '20px 0',
  },
  boleto: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0',
  },
}));
