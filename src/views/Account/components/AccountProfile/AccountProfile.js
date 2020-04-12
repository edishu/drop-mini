import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  } from '@material-ui/core';
import {auth} from '../../../../shared/firebaseAuth';


const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {

  const [userDetails, setUserDetails] = useState([{
    displayName: 'Dummy User',
    email: 'dummy.user@email.com',
    avatar: null
  }]);


  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged(firebaseUser => {
      if(mounted) {
        if(firebaseUser) {
          setUserDetails(firebaseUser.providerData);
        } else {
          setUserDetails([{
            displayName: 'Dummy User',
            email: 'dummy.user@email.com',
            avatar: null
          }]);
        }
      }
    });
    return () => mounted = false;
  });
  
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {`${userDetails[0].displayName.split(" ")[0]} ${userDetails[0].displayName.split(" ")[1]}`}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {userDetails[0].email}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={userDetails[0].avatar}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          component="label"
        >
          Upload picture
          {/* <input 
            type="file" style={{ display: "none" }} 
            onChange={event => uploadPicture(event)}
            /> */}
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
