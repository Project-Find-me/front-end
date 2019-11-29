import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  sumary: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  option: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
}));
