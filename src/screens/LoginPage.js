import React, {useState, useContext} from 'react';
import logo from '../assets/images/logo.jpeg';

import {
  useHistory,
  useLocation
} from "react-router-dom";

import {authContext} from '../context/Auth';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {Button, CssBaseline, TextField, Box, Typography, Container, Checkbox, Snackbar, IconButton, FormControlLabel} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright &copy;
      <Link color="inherit" href="">
        nosh
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: '#00B970',
  },
  logowrapper: {
    margin: theme.spacing(4),
  },
  logo: {
    width: '125px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submitphone: {
    margin: theme.spacing(5, 0, 5),
    backgroundColor:'#00B970',
  },
  submitguest: {
    margin: theme.spacing(3, 0, 2),
  },
  boxcheckbox:{
    paddingBottom:theme.spacing(2),
    borderBottom:'1px solid #808080',
  }
}));

function useAuth() {
  return useContext(authContext);
}

export default function SignIn() {

  let history   = useHistory();
  let location  = useLocation();
  let auth      = useAuth();

  const restaurantid	= "02e8cc31-5119-4fdf-b0c8-a518019ceec6";

  let { from } = location.state || { from: { pathname: "/" } };

  const [phone, setPhone] = useState('');
  const [isagree, setIsAgree] = useState(false);

  const login = (e) => {
    e.preventDefault();

    if(phone === "")
    {
      setToastState({ ...toaststate, open: true });
      return;
    }

    auth.signin(restaurantid, phone, Number(isagree), () => {

      history.replace(from);

    });

  };

  const loginGuest = () => {

    auth.signin(restaurantid, 'guest' , Number(isagree), () => {

      history.replace(from);

    });

  };

  const [toaststate, setToastState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = toaststate;

  const handleClose = () => {
    setToastState({ ...toaststate, open: false });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box className={classes.logowrapper}>
          <img src={logo} className={classes.logo} alt="App Logo"/>
        </Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} method="post" onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            type="number"
            autoComplete="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitphone}
          >
            Let's Go
            &nbsp;
            <ExitToAppOutlinedIcon />
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            By clicking <b>LET'S GO</b>. <Link to="" style={{color:'#00B970'}}>I agree to Nosh Privacy Policy</Link>
          </Typography>
          <Box mt={5} className={classes.boxcheckbox}>
          <FormControlLabel control={<Checkbox value={isagree} color="secondary" checked={Number(isagree) === 1} onChange={e => setIsAgree(!isagree)}/>}
            label="I do not wish to receive any marketing or promotional materials."
            style={{color:'#808080',fontSize:'0.875rem !important'}}
          />
          </Box>
          <Button
            type="button"
            fullWidth
            color="secondary"
            className={classes.submitguest}
            onClick={()=>{loginGuest()}}
          >
            Continue as Guest
            &nbsp;
            <ExitToAppOutlinedIcon />
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>

      <Snackbar autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Please enter your phone number"
        key={vertical + horizontal}

        action={
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
          }
      />

      
    </Container>
  );
}