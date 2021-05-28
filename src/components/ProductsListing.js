import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  titlewrapper:{
    justifyContent:'space-between',
    display:'flex',
    alignItems:'center'
  },
  title: {
    flexGrow: 1,
    fontSize:'1.5rem',
    marginRight:theme.spacing(1),
    marginLeft:theme.spacing(1),
    marginTop:theme.spacing(1.5),
    marginBottom:theme.spacing(1.5),
  },
  viewalltitle:{
    color:'#00B970',
    fontWeight:'bold',
    marginRight:theme.spacing(1)
  },
  itelist:{
    backgroundColor: '#ffffff', 
    height: '5vh',
    paddingRight:theme.spacing(1),
    paddingLeft:theme.spacing(1),
    marginTop:theme.spacing(1.5),
    marginBottom:theme.spacing(1.5),
    boxShadow:'1px 1px 2px -1px rgb(0 0 0 / 20%)'
  }
}));

export default function ProductsListing() {
  const classes = useStyles();

  return (
    <Fragment>
        <div className={classes.titlewrapper}>
            <Typography variant="h6" className={classes.title}>
                Popular
            </Typography>
            <div className={classes.viewalltitle}>View all</div>
        </div>
        <Container maxWidth="lg" className={classes.itelist}>
            <Typography component="div" >Item listing</Typography>
        </Container>
        <Container maxWidth="lg" className={classes.itelist}>
            <Typography component="div">Item listing</Typography>
        </Container>
        <Container maxWidth="lg" className={classes.itelist}>
            <Typography component="div">Item listing</Typography>
        </Container>
    </Fragment>
  );
}