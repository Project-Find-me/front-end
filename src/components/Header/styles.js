import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 75,
  },
  appbar: {
    display: 'flex',
  },
  menubutton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1100,
    justifyContent: 'space-between',
    height: 75,
  },
  avatar: {
    width: 55,
    height: 55,
  },
  menuIcon: {
    marginLeft: 15,
  },
}));
