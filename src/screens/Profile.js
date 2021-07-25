import React,{Component, Fragment} from 'react';
import {ProductConsumer, ProductContext} from '../context/Product';

import {withRouter} from "react-router-dom";
import {Button, TextField, Container, CssBaseline} from '@material-ui/core';
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
    margin: theme.spacing(5, 0, 5),
    padding: theme.spacing(1.5, 0, 1.5),
    backgroundColor:'#00B970',
    position:'absolute',
    bottom:'2rem',
    left:'0',
    right:'0'
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
    height:'99vh'
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

              const{name, phone, email} = value;
              const{handleChange, updateProfile} = value;

                return (
                    <Fragment>
                        <Header title="Profile" showdrawer={false} showsearch={true} history={this.props.history}/>
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submitphone}
                            >
                                Update Profile
                            </Button>
                        </form>
                        </Container>

                    </Fragment>
                )
            }}
          </ProductConsumer>
        )
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Profile));