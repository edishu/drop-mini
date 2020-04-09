import React , {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, LinearProgress, Typography } from '@material-ui/core';

import { SearchInput } from 'components';
import { uploadFile } from '../../../../shared/firebaseStorage';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
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

const ProductsToolbar = props => {
  const [loading, setLoading] = useState(false);
  const [loadValue, setLoadValue] = useState(0);

  const { className } = props;

  const classes = useStyles();

  return (
    <div
      // {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search File"
        />
        <span className={classes.spacer} />
        <div className={clsx(classes.progress, (loading ? null : classes.ifNotLoading))}>
          <Typography variant="body1" className={classes.uploading}>Uploading...</Typography>
          <LinearProgress
            value={loadValue}
            variant="determinate"
          />
        </div>
        <Button color="primary" variant="contained" component="label">
            Upload
          <input type="file" style={{ display: "none" }} 
            onChange={event => {
              uploadFile(event, props.pageReload, setLoading, setLoadValue);
              }}/>
        </Button>
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
