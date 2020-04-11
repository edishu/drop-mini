import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { auth } from '../../../../../../shared/firebaseAuth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {

  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged(firebaseUser => {
      if(mounted) {
        if(firebaseUser) {
          setUserName(firebaseUser.displayName);
        } else {
          setUserName('Dummy User');
        }
      }
    });
    return () => mounted = false;
  });

  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: userName,
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        // src={}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
