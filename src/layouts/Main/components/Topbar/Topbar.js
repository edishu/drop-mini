import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Grid, Typography, Avatar, Tooltip  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import {auth} from '../../../../shared/firebaseAuth';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logo: {
    height: 48,
    width: 48,
    fill: "#fff",
  },
  dropMini: {
    color: "#fff",
  },
}));

const Topbar = props => {
  // console.log('[Topbar]: ', auth.currentUser);
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let logOutButton = null;
  if(isAuthenticated) {
    logOutButton = <Tooltip title="Log-Out" placement="bottom-start">
                      <IconButton
                        className={classes.signOutButton}
                        color="inherit"
                        onClick={() => auth.signOut()}
                      >
                      <InputIcon />
                    </IconButton>
                  </Tooltip>
  }

  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged(firebaseUser => {
      if(mounted) {
        if(firebaseUser) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    });
    return () => mounted = false;
  });

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <Grid container spacing={2} justify="flex-start" alignItems="center">
            <Grid item>
              <Avatar
              variant="rounded"
              src="/images/shopping-bag.png"/>
            </Grid>
            <Grid item>
              <Typography className={classes.dropMini} variant="h1">
                Drop-Mini
              </Typography>
            </Grid>
          </Grid>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {logOutButton}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
