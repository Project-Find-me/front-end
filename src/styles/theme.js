import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 17,
  },
  palette: {
    primary: {
      main: indigo[500],
      light: indigo[200],
      dark: indigo[800],
    },
    secondary: {
      main: blue[500],
      light: blue[200],
      dark: blue[800],
    },
    error: red,
    background: '#f5f5f5',
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
