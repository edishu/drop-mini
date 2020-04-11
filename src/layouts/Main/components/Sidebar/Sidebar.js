import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import {auth} from '../../../../shared/firebaseAuth';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  // console.log('[Sidebar]: ', auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  let pages = [
    {
      title: 'Files',
      href: '/products',
      icon: <FolderIcon />
    },
    {
      title: 'Log-In/Sign-Up',
      href: '/sign-in',
      icon: <LockOpenIcon />
    }
    ,
    {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />
    },   
  ];

  if(isAuthenticated) {
    pages = [
      {
        title: 'Files',
        href: '/products',
        icon: <FolderIcon />
      },
      {
        title: 'Account',
        href: '/account',
        icon: <AccountBoxIcon />
      },
      {
        title: 'Log-Out',
        href: '/sign-out',
        icon: <LockIcon />
      }
      ,
      {
        title: 'Typography',
        href: '/typography',
        icon: <TextFieldsIcon />
      },   
    ];
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
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
