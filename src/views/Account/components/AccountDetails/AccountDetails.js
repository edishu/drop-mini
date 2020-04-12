import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import {auth} from '../../../../shared/firebaseAuth';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {

  const [userDetails, setUserDetails] = useState(null);
  const [values, setValues] = useState({
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@email.com',
    phone: '123-456-7890',
  });

  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged(firebaseUser => {
      if(mounted) {
        if(firebaseUser) {
          setValues({
            firstName: firebaseUser.providerData[0].displayName.split(" ")[0],
            lastName: firebaseUser.providerData[0].displayName.split(" ")[1],
            email: firebaseUser.providerData[0].email,
            phone: firebaseUser.providerData[0].phoneNumber ? firebaseUser.providerData[0].phoneNumber : '',
          });
        } else {
          setValues({
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@email.com',
            phone: '123-456-7890',
          });
        }
      }
    });
    return () => mounted = false;
  });
 
  const { className, ...rest } = props;

  const classes = useStyles();

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onUpdateHandler = () => {
    const user = auth.currentUser;
    user.updateProfile({
      displayName: `${values.firstName} ${values.lastName}`,
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onUpdateHandler()}
          >
            Update Profile
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
