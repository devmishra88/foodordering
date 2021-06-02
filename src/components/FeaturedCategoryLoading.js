import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
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
    marginRight:theme.spacing(1)
  }
}));

export default function FeaturedCategory() {
  const classes = useStyles();

  return (
    <Fragment>
        <div className={classes.titlewrapper}>
            <Typography variant="h6" className={classes.title}>
                <Skeleton width="60%" /> 
            </Typography>
            <div className={classes.viewalltitle}><Skeleton width={120} height={40} /></div>
        </div>
        <div className={classes.root}>
            <Skeleton variant="rect" width={110} height={110} style={{borderRadius:'10px'}}/>
            <Skeleton variant="rect" width={110} height={110} style={{borderRadius:'10px'}}/>
            <Skeleton variant="rect" width={110} height={110} style={{borderRadius:'10px'}}/>
        </div>
    </Fragment>
  );
}