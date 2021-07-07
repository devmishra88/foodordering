import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cutlery from '../assets/images/cutlery.png';

const useStyles = makeStyles((theme) => ({
  gQyQJp:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5rem 0px',
    width: '100%',
  },
  bAgJbS:{
    position: 'relative',
    maxWidth: '100%',
    width: '26.4rem',
    height: '16.5rem',
    overflow: 'hidden',
  },
  dqsEmh:{
    width: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    background: 'linear-gradient(to right, rgb(248, 248, 248) 0%, rgb(255, 255, 255) 10%, rgb(248, 248, 248) 40%, rgb(248, 248, 248) 100%) no-repeat rgb(248, 248, 248)',
    opacity: '0',
    transition: 'opacity 0.25s ease-out 0s',
    willChange: 'opacity',
    borderRadius: 'inherit',
    animation: '1.5s linear 0s infinite normal forwards running',
  },
  cNjMLA:{
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transform: 'none',
    opacity: '1',
    willChange: 'transform, opacity',
    borderRadius: 'inherit',
    filter: 'unset',
    transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
  },
  paragraph: {
    fontSize: '1.3rem',
    lineHeight: '1.7rem',
    color: 'rgb(79, 79, 79)',
  },
}));

export default function ItemNotFound(props) {
  const classes = useStyles();

  return (
    <Fragment>
        <div className={classes.root}>
            <div className={classes.gQyQJp}>
                <div className={classes.bAgJbS}>
                    <div className={classes.dqsEmh}></div>
                    <img alt="404 preview" src={cutlery} loading="lazy" className={classes.cNjMLA} />
                </div>
                <p>No items found that match your search/filter.</p>
            </div>
        </div>
    </Fragment>
  );
}