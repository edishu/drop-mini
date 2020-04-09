import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Grid from '@material-ui/core/Grid';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  icon: {
    height: 48,
    width: 48,
    fill: "#111",
  },
  github: {
    fill: "#333",
  },
  linkedin: {
    fill: "#0077b5",
  },
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid container spacing={3} justify="flex-end">
        <Grid item>
            <Link
              component="a"
              href="https://github.com/edishu"
              target="_blank"
            >
              <GitHubIcon className={clsx(classes.icon, classes.github)}/>
            </Link>
        </Grid>
        <Grid item>
            <Link
              component="a"
              href="https://linkedin.com/in/udayanmaurya"
              target="_blank"
            >
              <LinkedInIcon className={clsx(classes.icon, classes.linkedin)}/>
            </Link>
        </Grid>
        <Grid item>
            <Link
              component="a"
              href="https://udayanmaurya.com"
              target="_blank"
            >
              <AccountBoxIcon className={classes.icon}/>
            </Link>
        </Grid>
      </Grid>

      <Grid container justify="flex-end">
        <Grid item>
          <Typography variant="caption">
            <Link
              component="a"
              href="https://udayanmaurya.com"
              target="_blank"
            >
            Created with love by Udayan Maurya.
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
