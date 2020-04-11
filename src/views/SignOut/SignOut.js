import React, { Fragment, useEffect } from 'react';
import { auth } from '../../shared/firebaseAuth';
import { withRouter } from 'react-router-dom';

const SignOut = props => { 
    auth.signOut();
    useEffect(() => props.history.push('/'));
    return (<Fragment></Fragment>);
}

export default withRouter(SignOut);