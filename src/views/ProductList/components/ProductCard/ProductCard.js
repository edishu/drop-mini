import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import DescriptionIcon from '@material-ui/icons/Description';
import {dateToStr} from '../../../../shared/utility';
import filesize from 'filesize';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFile, downloadFile } from '../../../../shared/firebaseStorage';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  modalStyle: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modalOff: {
    display: "none"
  },
  icon: {
    fill: "#fff",
  },
  deleteButton: {
    backgroundColor: "#dc004e",
  },
  paper: {
    position: 'absolute',
    width: 650,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const modalStyle = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ProductCard = props => {
  const { className, product, pageRefresh } = props;
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  let icon;
  switch (product.contentType.split("/")[0]) {
    case 'image':
      icon = <ImageIcon/>; break;
    case 'video':
      icon = <MovieIcon/>; break;
    default:
      icon = <DescriptionIcon/>;
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const cardContents = (<div> 
                  <CardContent >
                    <div className={classes.imageContainer}>
                      {icon}
                    </div>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h4"
                    >
                      {product.name.split(".")[0]}
                    </Typography>
                    <Typography
                      align="center"
                      variant="body1"
                    >
                      {`.${product.name.split(".")[1]}`}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions >
                    <Grid
                      container
                      justify="space-between"
                    >
                      <Grid
                        className={classes.statsItem}
                        item
                      >
                        <AccessTimeIcon className={classes.statsIcon} />
                        <Typography
                          display="inline"
                          variant="body2"
                        >
                          {dateToStr(new Date(product.timeCreated))}
                        </Typography>
                      </Grid>
                      <Grid
                        className={clsx(classes.statsItem, (modalOpen ? null : classes.modalOff))}
                        item
                      >
                        <Button
                          variant="contained" 
                          color="secondary"
                          onClick={() => {
                            downloadFile(product.fullPath);
                          }}
                        >
                          <GetAppIcon className={clsx(classes.statsIcon, classes.icon)}/>
                          Download
                        </Button>
                      </Grid>
                      <Grid
                        className={clsx(classes.statsItem, (modalOpen ? null : classes.modalOff))}
                        item
                      >
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => {
                            deleteFile(product.fullPath)
                            .then(res => {
                              pageRefresh(); 
                              console.log(res);
                              handleModalClose();
                            })
                            .catch(err => console.log(err.message))
                          }}
                          className={classes.deleteButton}
                          >
                          <DeleteIcon className={clsx(classes.statsIcon, classes.icon)}/>
                          Delete
                        </Button>
                      </Grid>
                      <Grid
                        className={classes.statsItem}
                        item
                      >
                        <Typography display="inline" variant="h6">Size:&nbsp;</Typography>
                        <Typography
                          display="inline"
                          variant="body2"
                        >
                          {filesize(product.size)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardActions>
                </div>);

  return (
    <Fragment>
    <Modal 
        open={modalOpen} 
        onClose={handleModalClose}
      >
        <Card className={clsx(classes.root, classes.paper, className)} style={modalStyle}>
        {cardContents}
        </Card>
    </Modal>
    <Card
      className={clsx(classes.root, className)}
      onClick={handleModalOpen}
    >
      {cardContents}
    </Card>
    </Fragment>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
