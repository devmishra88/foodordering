import React,{Component, Fragment} from 'react';
import {withRouter, Redirect} from "react-router-dom";
import {ProductConsumer, ProductContext} from '../context/Product';
import { withStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import { Container, Button, Backdrop, CircularProgress, IconButton, Collapse, Typography, List, ListItem } from '@material-ui/core';

import {Header, ItemNotFound} from '../components';

import {Remove,Plus}  from '../constants';

import {Orderthanks, Viewcart} from '../components';

const useStyles = (theme) => ({
  itelist:{
    paddingRight:theme.spacing(1),
    paddingLeft:theme.spacing(1),
    marginTop:theme.spacing(1.5),
    marginBottom:theme.spacing(1.5),
    paddingBottom:theme.spacing(1.5),
    borderBottom:'1px solid #dcd8d8',
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
  jOoliK:{
      display: 'flex',
      alignItems: 'center',
      margin: '0.5rem 0px',
  },
  cCiQWA:{
      fontSize: '1.2rem',
      color: '#00B970',
      fontWeight:'600',
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
  qtychildin:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '5.2rem',
    height: '1.8rem',
    border: '1px solid #00B970',
    borderRadius: '0.2rem',
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
    justifyContent:'space-between',
  },
  iQCkqv:{
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
  teiDS:{
      height: '2.8rem',
      width:'94%',
      display: 'flex',
      position: 'fixed',
      bottom: '0px',
      background: '#EDEDEE',
      borderRadius: '1rem 1rem 0px 0px',
      padding:'1rem .8rem',
      justifyContent:'space-between',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class CartDetail extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

        this.context.resetRedirectToMenu();
        this.context.addTotals();        

    }

    goBack=()=>{

        this.props.history.goBack();
    }

    render(){
        
        const { classes } = this.props;

        return (
            <ProductConsumer>
                {(value) => {

                    const{ cart, isorderadding, isalertopen, cartseverity, redirecttomenu, orderaddedmsg, isorderadded, cancheckout } = value;

                    const{ incrementCustomOption, decrementCustomOption, placeOrder, closeCartAlert } = value;

                    if(!cancheckout)
                    {
                        return <Viewcart />
                    }
                    else
                    {
                        if(isorderadded)
                        {
                        }
                        else
                        {   
                        }
                    }
                }}
            </ProductConsumer>
        );
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(CartDetail));
