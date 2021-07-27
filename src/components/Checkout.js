import React,{Component, Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Container, Box, Divider, Button, TextareaAutosize, Backdrop, CircularProgress} from '@material-ui/core';

import { ProductConsumer, ProductContext } from '../context/Product';

const useStyles = (theme) => ({
    submitphone: {
      backgroundColor:'#00B970',
      borderRadius:'25px',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class Checkout extends Component{

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }

	render(){

        const { classes } = this.props;

        return (
            <ProductConsumer>
            {(value) => {

                const{ nosh_localdata, cart, specialInstructions, isorderadding, cartTotal, cartTax } = value;
                const{ handleChange, placeOrder } = value;

                return (
                    <Fragment>
                        <Container maxWidth="lg" style={{marginTop:'10px'}}>
                            <Box lineHeight="normal" p={1} fontWeight={500} style={{marginBottom:'1.5rem'}}>
                                Order Summary
                            </Box>
                            {cart.map((item, i) => {
                                return(
                                    <Box display="flex" bgcolor="grey.200" style={{marginBottom:'1.5rem'}} key={i}>
                                        <Box p={1} flexGrow={1} display="flex" alignItems="center">
                                            <Box fontWeight={500}>{item.count}</Box>&nbsp;
                                            <Box fontWeight={500}> x</Box>&nbsp;
                                            <Box fontWeight={500}>
                                                {item.item_name}
                                                <Box fontWeight="normal" fontSize={12}>
                                                {
                                                    item.selectedoption.map((option, optionloop)=>{
                                                        return <span key={optionloop} className="optionname small">{option.item}</span>
                                                    })
                                                }
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box fontWeight={500} p={1}>
                                            {nosh_localdata.restaurant_currency !== "" && nosh_localdata.restaurant_currency !== undefined ? `${nosh_localdata.restaurant_currency}`:<i className="fa fa-inr"></i>}{item.total.toFixed(2)}
                                        </Box>
                                    </Box>                                    
                                );
                            })}
                        </Container>
                        <Divider />
                        <Container maxWidth="lg" style={{marginBottom:'.5rem'}}>
                            <Box display="flex" fontWeight={500} style={{marginBottom:'.5rem'}}>
                                <Box p={1} flexGrow={1}>
                                    Total
                                </Box>
                                <Box p={1}>
                                    {nosh_localdata.restaurant_currency !== "" && nosh_localdata.restaurant_currency !== undefined ? `${nosh_localdata.restaurant_currency}`:<i className="fa fa-inr"></i>}{cartTotal}
                                </Box>
                            </Box>
                    {
                        Number(nosh_localdata.restaurant_vat) !== "" ? (
                            <Box display="flex" fontWeight={500} style={{marginBottom:'.5rem'}}>
                                <Box p={1} flexGrow={1}>
                                    GST {nosh_localdata.restaurant_vat}% Incl
                                </Box>
                                <Box p={1}>
                                    {nosh_localdata.restaurant_currency !== "" && nosh_localdata.restaurant_currency !== undefined ? `${nosh_localdata.restaurant_currency}`:<i className="fa fa-inr"></i>}{cartTax}
                                </Box>
                            </Box>
                        ):null 
                    }
                        </Container>
                        <Divider />
                        <Container maxWidth="lg" style={{marginBottom:'.5rem',marginTop:'.5rem'}}>
                            <Box lineHeight="normal" p={1} fontWeight={500} style={{marginBottom:'1rem'}}>
                                Special Instructions <span style={{color:'#bfbebe',fontWeight:'normal'}}>(Optional)</span>
                            </Box>
                            <Box lineHeight="normal" p={1}>
                                <TextareaAutosize aria-label="minimum height" minRows={5} name="specialInstructions" id="specialInstructions" value={specialInstructions} onChange={handleChange} placeholder="Special Instructions" style={{width:'98%'}}/>
                            </Box>
                            <Box lineHeight="normal" p={1} style={{margin:'auto'}}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={placeOrder}
                                    >
                                    Place Order
                                </Button>
                            </Box>
                        </Container>
                        <Backdrop className={classes.backdrop} open={isorderadding}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Fragment>
                );
            }}
            </ProductConsumer>
        );
	}
}

export default withStyles(useStyles, { withTheme: true })(Checkout);