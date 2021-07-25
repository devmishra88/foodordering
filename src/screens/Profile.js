import React,{Component, Fragment} from 'react';
import {ProductConsumer, ProductContext} from '../context/Product';

import {withRouter} from "react-router-dom";

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import {Button, TextField, Container, CssBaseline, Backdrop, CircularProgress, Collapse, IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {Header} from '../components';

const useStyles = (theme) => ({
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
    padding: theme.spacing(1.5, 0, 1.5),
    backgroundColor:'#00B970',
    borderRadius:'25px',
  },
  submitguest: {
    margin: theme.spacing(3, 0, 2),
  },
  boxcheckbox:{
    paddingBottom:theme.spacing(2),
    borderBottom:'1px solid #808080',
  },
  mainwrapper:{
    position:'relative',
    height:'88vh'
  }
});

class Profile extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

      this.context.initProfile();

    }

    render(){

        const { classes } = this.props;

        return (

          <ProductConsumer>
            {(value) => {

              const{name, phone, email, isprofileupdating, isprofilealertopen, profileseverity, profileupdatemsg} = value;
              const{handleChange, updateProfile, closeProfileAlert} = value;

                return (
                    <Fragment>
                        <Header title="Profile" showdrawer={false} showsearch={true} history={this.props.history}/>
                        <Collapse in={isprofilealertopen}>
                            <Alert
                                severity={`${profileseverity}`}
                                action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                      closeProfileAlert();
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                                }
                            >
                                {profileupdatemsg}
                            </Alert>
                        </Collapse>
                        <Container component="main" maxWidth="xs" className={classes.mainwrapper}>
                        <CssBaseline />
                        <form className={classes.form} method="post" onSubmit={updateProfile}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                type="text"
                                autoComplete="Name"
                                value={name}
                                onChange={handleChange}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                type="number"
                                autoComplete="Phone"
                                value={phone}
                                onChange={handleChange}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                value={email}
                                onChange={handleChange}
                                autoFocus
                            />
                            <div style={{position:'absolute',bottom:'10px',left:'0',right:'0',width:'95%',margin:'auto'}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submitphone}
                            >
                                Update Profile
                            </Button>
                            </div>
                        </form>
                        </Container>
                        <Backdrop className={classes.backdrop} open={isprofileupdating}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Fragment>
                )
            }}
          </ProductConsumer>
        )
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Profile));