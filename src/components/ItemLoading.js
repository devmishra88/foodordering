import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import {Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  itelist:{
    paddingRight:theme.spacing(1),
    paddingLeft:theme.spacing(1),
    marginTop:theme.spacing(1.5),
    marginBottom:theme.spacing(1.5),
    paddingBottom:theme.spacing(1.5),
    borderBottom:'1px solid #dcd8d8',
  },
  titlewrapper:{
    justifyContent:'space-between',
    display:'flex',
    alignItems:'center'
  },
  viewalltitle:{
    color:'#00B970',
    fontWeight:'bold',
    marginRight:theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    fontSize:'1.5rem',
    marginRight:theme.spacing(1),
    marginLeft:theme.spacing(1),
    marginTop:theme.spacing(1.5),
    marginBottom:theme.spacing(1.5),
  },
  bGrnCu:{
      display: 'flex',
      flexDirection: 'row',
  },
  bckjvf:{
      marginRight: '1rem',
      position: 'relative',
      marginBottom: '0px',
      flexShrink: '0',
  },
  jlQqiv:{
      position: 'relative',
      maxWidth: '100%',
      width: '6.5rem',
      height: '6.5rem',
      overflow: 'hidden',
      borderRadius: '0.8rem',
      visibility: 'visible',
      transition: 'all 0.12s ease 0s',
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
  hppEfq:{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: 'none',
      opacity: '1',
      willChange: 'transform, opacity',
      borderRadius: 'inherit',
      filter: 'unset',
      transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
  },
  bXZAXS:{
      width: '1.3rem',
      height: '1.3rem',
      border: '1px solid rgb(80, 181, 71)',
      borderRadius: '2px',
      display: 'flex',
      /*-webkit-box-align: 'center',
      -webkit-box-pack: 'center',*/
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgb(255, 255, 255)',
      flexShrink: '0',
      position: 'absolute',
      top: '0.6rem',
      right: '0.6rem',
  },
  kEJKBm:{
      width: '0.7rem',
      height: '0.7rem',
      background: 'rgb(80, 181, 71)',
      borderRadius: '50%',
  },
  cYSFTJ:{
      width: '100%',
      minWidth: '1%',
      position:'relative'
  },
  cYGeYt:{
      display: 'flex',
      /*-webkit-box-pack: 'justify',*/
      justifyContent: 'space-between',
  },
  kQHKsO:{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '75%',
  },
  iSmBPS:{
      fontSize: '1.2rem',
      fontWeight: '500',
      color: 'rgb(28, 28, 28)',
      margin: '0px',
  },
  dpXgPd:{
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0.5rem 0px',
  },
  jYdcVk:{
      marginRight: '0.5rem',
      marginBottom: '0.2rem',
  },
  GCkMO:{
      height: 'max-content',
      width: 'max-content',
      background: 'rgb(244, 162, 102)',
      display: 'flex',
      /*-webkit-box-align: 'center',
      -webkit-box-pack: 'center',*/
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      color: 'rgb(255, 255, 255)',
      fontSize: '1rem',
      border: 'none',
      padding: '0.2rem 0.5rem',
  },
  cgvpvS:{
      display: 'flex',
      /*-webkit-box-align: 'center',*/
      alignItems: 'center',
      margin: '0.3rem 0px',
  },
  daaTtj:{
      display: 'flex',
  },
  MxLSp:{
      display: 'flex',
      /*-webkit-box-align: 'center',*/
      alignItems: 'center',
      cursor: 'inherit',
      marginRight: '0.2rem',
  },
  kNMtU:{
      marginLeft: '0.7rem',
      fontSize: '1.4rem',
      color: 'rgb(156, 156, 156)',
      marginTop: '0.2rem',
  },
  jOoliK:{
      display: 'flex',
      /*-webkit-box-align: 'center',*/
      alignItems: 'center',
      margin: '0.5rem 0px',
  },
  cCiQWA:{
      fontSize: '1.2rem',
      color: 'rgb(28, 28, 28)',
  },
  fJNrek:{
      display: 'flex',
      flexDirection: 'column',
      /*-webkit-box-align: 'center',*/
      alignItems: 'center',
  },
  cBmpNp:{
      display: 'flex',
      /*-webkit-box-align: 'center',
      -webkit-box-pack: 'center',*/
      alignItems: 'center',
      justifyContent: 'center',
      width: '5.2rem',
      height: '1.8rem',
      border: '1px solid rgb(181, 181, 181)',
      borderRadius: '0.2rem',
      overflow: 'hidden',
      cursor: 'pointer',
      userSelect: 'none',
      background: 'rgb(255, 255, 255)',
  },
  frTalr:{
      lineHeight: '1.2rem',
      display: 'inherit',
      fontSize: '1rem',
      marginTop: '4px',
      color: 'rgb(244, 162, 102)',
  },
  hcROsL:{
      fontSize: '1rem',
      fontWeight: '400',
      maxWidth: '100%',
      margin: '0px',
      overflowWrap: 'break-word',
      color:'#868686',
  },
  qtychild:{
    /*-webkit-box-align: center;*/
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '-3rem',
    zIndex:'9',
  },
  qtychildin:{
    /*-webkit-box-align: center;
    -webkit-box-pack: center;*/
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '6rem',
    height: '2rem',
    border: '1px solid #00B970',
    borderRadius: '0.6rem',
    overflow: 'hidden',
    cursor: 'initial',
    userSelect: 'none',
    background: '#00B970',
  },
  cMipmx:{
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  hTzRFw:{
    /*-webkit-box-flex: 0;
    -webkit-box-pack: center;
    -webkit-box-align: center;*/
    position: 'relative',
    width: '100%',
    flexGrow: '0',
    flexShrink: '0',
    maxWidth: '31.6667%',
    padding: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iQCkqv:{
    /*-webkit-box-pack: center,
    -webkit-box-align: center,
    -webkit-box-flex: 0,*/
    position: 'relative',
    width: '100%',
    flexGrow: '0',
    flexShrink: '0',
    maxWidth: '36.6667%',
    padding: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#00B970',
    cursor: 'initial',
    height: '99%',
  },
  qtytitle:{
    color: '#ED5A6B',
    fontSize: '1.2rem',
    margin: '0px 0.5rem',
    fontWeight: '600',
  },
  hTzRFw:{
    /*-webkit-box-pack: center,
    -webkit-box-align: center,
    -webkit-box-flex: 0,*/
    position: 'relative',
    width: '100%',
    flexGrow: '0',
    flexShrink: '0',
    maxWidth: '31.6667%',
    padding: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));

export default function ItemLoading() {
  const classes = useStyles();

  return (
    <Fragment>
        <div className={classes.titlewrapper}>
            <Typography variant="h6" className={classes.title}>
                <Skeleton width="100%" /> 
            </Typography>
            <div className={classes.viewalltitle}><Skeleton width={120} height={40} /></div>
        </div>
        <div className={classes.root}>
        <Container maxWidth="lg" className={classes.itelist}>
        <div>
            <div className={classes.bGrnCu}>
            <div className={classes.bckjvf}>
                <div className={classes.jlQqiv}>
                <div src="" className={classes.dqsEmh}></div>
                    <Skeleton variant="rect" width={120} height={120} style={{borderRadius:'10px'}}/>
                </div>
            </div>
            <div className={classes.cYSFTJ}>
                <div className={classes.cYGeYt}>
                <div className={classes.kQHKsO}>
                    <h4 className={classes.iSmBPS}><Skeleton width={120} /></h4>
                </div>
                </div>
                <p className={classes.hcROsL}><Skeleton width="100%" /><Skeleton width="100%" /><Skeleton width="100%" /></p>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginTop:'1rem'}}>
                <div className={classes.jOoliK}>
                    <span className={classes.cCiQWA}><Skeleton width={100} height={40} /></span>
                </div>
                <div>
                    <Skeleton width={80} height={40} />
                </div>
                </div>
            </div>
            </div>
        </div>
        </Container>
        <Container maxWidth="lg" className={classes.itelist}>
        <div>
            <div className={classes.bGrnCu}>
            <div className={classes.bckjvf}>
                <div className={classes.jlQqiv}>
                <div src="" className={classes.dqsEmh}></div>
                    <Skeleton variant="rect" width={120} height={120} style={{borderRadius:'10px'}}/>
                </div>
            </div>
            <div className={classes.cYSFTJ}>
                <div className={classes.cYGeYt}>
                <div className={classes.kQHKsO}>
                    <h4 className={classes.iSmBPS}><Skeleton width={120} /></h4>
                </div>
                </div>
                <p className={classes.hcROsL}><Skeleton width="100%" /><Skeleton width="100%" /><Skeleton width="100%" /></p>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginTop:'1rem'}}>
                <div className={classes.jOoliK}>
                    <span className={classes.cCiQWA}><Skeleton width={100} height={40} /></span>
                </div>
                <div>
                    <Skeleton width={80} height={40} />
                </div>
                </div>
            </div>
            </div>
        </div>
        </Container>
        <Container maxWidth="lg" className={classes.itelist}>
        <div>
            <div className={classes.bGrnCu}>
            <div className={classes.bckjvf}>
                <div className={classes.jlQqiv}>
                <div src="" className={classes.dqsEmh}></div>
                    <Skeleton variant="rect" width={120} height={120} style={{borderRadius:'10px'}}/>
                </div>
            </div>
            <div className={classes.cYSFTJ}>
                <div className={classes.cYGeYt}>
                <div className={classes.kQHKsO}>
                    <h4 className={classes.iSmBPS}><Skeleton width={120} /></h4>
                </div>
                </div>
                <p className={classes.hcROsL}><Skeleton width="100%" /><Skeleton width="100%" /><Skeleton width="100%" /></p>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginTop:'1rem'}}>
                <div className={classes.jOoliK}>
                    <span className={classes.cCiQWA}><Skeleton width={100} height={40} /></span>
                </div>
                <div>
                    <Skeleton width={80} height={40} />
                </div>
                </div>
            </div>
            </div>
        </div>
        </Container>
        <Container maxWidth="lg" className={classes.itelist}>
        <div>
            <div className={classes.bGrnCu}>
            <div className={classes.bckjvf}>
                <div className={classes.jlQqiv}>
                <div src="" className={classes.dqsEmh}></div>
                    <Skeleton variant="rect" width={120} height={120} style={{borderRadius:'10px'}}/>
                </div>
            </div>
            <div className={classes.cYSFTJ}>
                <div className={classes.cYGeYt}>
                <div className={classes.kQHKsO}>
                    <h4 className={classes.iSmBPS}><Skeleton width={120} /></h4>
                </div>
                </div>
                <p className={classes.hcROsL}><Skeleton width="100%" /><Skeleton width="100%" /><Skeleton width="100%" /></p>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginTop:'1rem'}}>
                <div className={classes.jOoliK}>
                    <span className={classes.cCiQWA}><Skeleton width={100} height={40} /></span>
                </div>
                <div>
                    <Skeleton width={80} height={40} />
                </div>
                </div>
            </div>
            </div>
        </div>
        </Container>
        </div>
    </Fragment>
  );
}