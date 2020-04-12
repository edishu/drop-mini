import React , { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

import { SearchInput } from 'components';
import { uploadFile } from '../../../../shared/firebaseStorage';
import {auth} from '../../../../shared/firebaseAuth';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  progress: {
    marginRight: theme.spacing(3),
    width: 150
  },
  uploading: {
    marginBottom: theme.spacing(0.5)
  },
  ifNotLoading: {
    display: "none"
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
  >
    <RouterLink {...props} />
  </div>
));

const ProductsToolbar = props => {
  const [loading, setLoading] = useState(false);
  const [loadValue, setLoadValue] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { className } = props;

  const classes = useStyles();

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

  let uploadButton = (<Button color="primary" 
                              variant="contained" 
                              component={CustomRouterLink}
                              to="/sign-in">
                          Sign-in to Upload
                        </Button>);

  if(isAuthenticated) {
    uploadButton = (<Button color="primary" 
                            variant="contained" 
                            component="label">
                      Upload
                      <input type="file" style={{ display: "none" }} 
                        onChange={event => {
                        uploadFile(event, props.pageReload, setLoading, setLoadValue, props.firebaseFolder);
                      }}/>
                    </Button>);
  }


  return (
    <div
      // {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        {/* <SearchInput
          className={classes.searchInput}
          placeholder="Search File"
        /> */}
        <span className={classes.spacer} />
        <div className={clsx(classes.progress, (loading ? null : classes.ifNotLoading))}>
          <Typography variant="body1" className={classes.uploading}>Uploading...</Typography>
          <LinearProgress
            value={loadValue}
            variant="determinate"
          />
        </div>
        {uploadButton}
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
