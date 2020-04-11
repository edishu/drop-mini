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
  
  useEffect(() => {
    let mounted = true;
    if (mounted) {
        auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
          setUserDetails(firebaseUser.providerData);
        } 
      })
    }
    return () => mounted = false;
  }, []);


  useEffect(() => {
    let mounted = true;
    if (mounted && userDetails) {
      setValues({
        firstName: userDetails[0].displayName.split(" ")[0],
        lastName: userDetails[0].displayName.split(" ")[1],
        email: userDetails[0].email,
        phone: userDetails[0].phoneNumber ? userDetails[0].phoneNumber : '',
      });
    }
    return () => mounted = false;
  }, [userDetails]);

  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Dummy',
    lastName: 'User',
    email: 'dummy.user@email.com',
    phone: '123-456-7890',
  });

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
