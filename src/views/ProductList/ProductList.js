import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard } from './components';
import { getFilesList, getMetaFileList } from '../../shared/firebaseStorage';
import { auth } from '../../shared/firebaseAuth';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2),
    minHeight: "50vh",
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
  const [userFiles, setUserFiles] = useState("");
  const [currentPage, setPage] = useState(0);
  const [filesList, setFilesList] = useState([]);
  const [nextAvailable, setNextAvailable] = useState(true);
  const [filesMetadataList, setFilesMetadataList] = useState([]);

  // Functions
  const getFilesListLocal = (files, pageNum) => {
    getFilesList(files, pageNum)
    .then(list => {
      setFilesList(list[0].items);
      if(!list[0].nextPageToken) {
        setNextAvailable(false);
      } else {
        setNextAvailable(true);
      }
      setPage(list[1]);
    })
    .catch(err => console.log(err.message));
  }

  useEffect(() => {
    getFilesListLocal(userFiles, currentPage);
  }, [userFiles, currentPage]);
  
  useEffect(() => {
    getMetaFileList(filesList)
    .then(metaList => setFilesMetadataList(metaList))
    .catch(err => console.log(err.message));
  }, [filesList]);

  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged(firebaseUser => {
      if(mounted) {
        if(firebaseUser) {
          setUserFiles(firebaseUser.uid);
        } else {
          setUserFiles("files");
        }
      }
    });
    return () => mounted = false;
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProductsToolbar 
      pageReload={() => getFilesListLocal(userFiles, currentPage)} 
      firebaseFolder = {userFiles}
      />
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
                pageRefresh={() => getFilesListLocal(userFiles, currentPage)}/>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <IconButton 
          disabled={currentPage===0}
          onClick={() => setPage(currentPage-1)}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="subtitle1">{`${currentPage*6 + 1} - ${(currentPage + 1)*6}`}</Typography>
        <IconButton 
          disabled={!nextAvailable}
          onClick={() => setPage(currentPage+1)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
