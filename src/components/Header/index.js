import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import history from '../../services/history';
import useStyles from './styles';
import logo from '../../assets/logo.svg';
import userImage from '../../assets/userImage.jpg';

import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const { signed, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = path => {
    history.push(path);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <Button onClick={() => history.push('/')}>
            <img src={logo} alt="Logo find.me" />
          </Button>
          {signed ? (
            <div>
              <IconButton
                onClick={() => handleClick('/profile')}
                edge="end"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar
                  className={classes.avatar}
                  alt="Avatar do usuário"
                  src={user.imagemDiretorio ? user.imagemDiretorio : userImage}
                />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.menuIcon}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <div className={classes.menu}>
                  <MenuItem onClick={() => handleClick('/')}>
                    Principal
                  </MenuItem>
                  <MenuItem onClick={() => handleClick('/schedule')}>
                    Agenda
                  </MenuItem>
                  <MenuItem onClick={() => handleClick('/history')}>
                    Histórico
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(signOut());
                      setAnchorEl(null);
                    }}
                  >
                    Sair
                  </MenuItem>
                </div>
              </Menu>
            </div>
          ) : (
            <Button onClick={() => handleClick('/signin')} variant="contained">
              Entrar
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
