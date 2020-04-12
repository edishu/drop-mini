import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Grid, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  dropMini: {
    color: "#fff",
  },
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
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
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
