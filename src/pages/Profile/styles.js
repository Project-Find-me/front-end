import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    display: 'flex',
    alignSelf: 'center',
    width: 180,
    height: 180,
    margin: '15px 0',
  },
}));
