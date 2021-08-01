import React,{Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import { Divider, Box, Typography, CircularProgress, Stepper, Step, StepLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ProductConsumer, ProductContext } from '../context/Product';

import {Header, ItemNotFound} from '../components';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
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
  steproot:{
    paddingLeft:'5px',
    paddingRight:'5px',
  },
});

class Orderstatus extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

        this.context.initSingleOrder();

    }

    render(){

        const { classes } = this.props;

        return (
            <ProductConsumer>
            {(value) => {

                const{ issingleorderloaded, hasorderdetail, singleorder } = value;

                return (
                    <Fragment>
                        <Header title="Order Status" showdrawer={false} showsearch={true} history={this.props.history}/>
                        {
                            issingleorderloaded ? (
                                <Fragment>
                                    {
                                        hasorderdetail ? (
                                            <Box style={{marginTop:'1rem'}}>
                                                {
                                                    singleorder.items.map((item, i)=>{
                                                        return(
                                                            <Box key={i}>
                                                                <Box display="flex" key={i}>
                                                                    <Box className={classes.bckjvf}>
                                                                        <div className={classes.jlQqiv}>
                                                                            <div src="" className={classes.dqsEmh}></div>
                                                                            <img alt={`${item.item_name} Preview`} src={item.image_url} className={classes.hppEfq} />
                                                                        </div>
                                                                    </Box>
                                                                    <Box width="100%">
                                                                        <Typography style={{fontWeight:'500'}}>{item.item_name}</Typography>
                                                                        <Divider />
                                                                        <Typography>Qty : {item.quantity}</Typography>
                                                                        <Divider />
                                                                        <Typography>Status : {singleorder.order_status}</Typography>
                                                                        <Divider />
                                                                    </Box>
                                                                </Box>
                                                                <Stepper alternativeLabel className={classes.steproot}>
                                                                    <Step completed={true} classes={{
                                                                        root: classes.step,
                                                                        completed: classes.completed,
                                                                        active: classes.active
                                                                    }}>
                                                                        <StepLabel>Processing</StepLabel>
                                                                    </Step>
                                                                    <Step completed={false} classes={{
                                                                        root: classes.step,
                                                                        completed: classes.completed,
                                                                        active: classes.active,
                                                                    }}>
                                                                        <StepLabel>Ready</StepLabel>
                                                                    </Step>
                                                                    <Step completed={false} classes={{
                                                                        root: classes.step,
                                                                        completed: classes.completed,
                                                                        active: classes.active
                                                                    }}>
                                                                        <StepLabel>Served</StepLabel>
                                                                    </Step>
                                                                </Stepper>
                                                                <Divider />
                                                            </Box>
                                                        )
                                                    })
                                                }
                                            </Box>
                                        ):(
                                            <ItemNotFound msg="No recent order found"/>
                                        )
                                    }
                                </Fragment>
                            ):(
                                <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexGrow: 1, height:'90vh'}}>
                                    <CircularProgress disableShrink />
                                </div>
                            )
                        }        
                    </Fragment>
                )

            }}
            </ProductConsumer>
        );
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Orderstatus));