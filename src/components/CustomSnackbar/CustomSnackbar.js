import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const CustomSnackbar = props => {
    let { errMsg } = props;    
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if(errMsg.length !== 0) {
            setOpen(true);
        } 
    }, [props])
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">
                {errMsg}
            </Alert>
        </Snackbar>
        </div>
    );
}

export default CustomSnackbar;