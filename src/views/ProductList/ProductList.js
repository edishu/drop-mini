import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard } from './components';
import { getFilesList, getMetaFileList } from '../../shared/firebaseStorage';
import firebase from '../../config/firebase/firebaseInit';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const ProductList = () => {
  // State of ProductList component
  const[filesList, setFilesList] = useState([]);
  const [filesMetadataList, setFilesMetadataList] = useState([]);

  const getFilesListLocal = (files) => {
    getFilesList(files)
    .then(list => setFilesList(list))
    .catch(err => console.log(err.message));
  }
  useEffect(() => {
    getFilesListLocal("files");
  }, []);
  
  useEffect(() => {
    getMetaFileList(filesList)
    .then(metaList => setFilesMetadataList(metaList))
    .catch(err => console.log(err.message));
  }, [filesList]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProductsToolbar pageReload={() => getFilesListLocal("files")} />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {filesMetadataList.map(product => (
            <Grid
              item
              key={product.md5Hash}
              lg={4}
              md={6}
              xs={12}
            >
              <ProductCard 
                product={product}
                pageRefresh={() => getFilesListLocal("files")}/>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="subtitle1">1-6 of 20</Typography>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
