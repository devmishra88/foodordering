import React,{Component} from 'react';
import {withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Box, Divider, Container } from '@material-ui/core';

import { ProductConsumer } from '../context/Product';

const useStyles = (theme) => ({
    btnstyle: {
      backgroundColor:'#00B970',
      borderRadius:'25px',
    }
});

class Order extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }

	render(){
        const {singleorder, nosh_localdata} = this.props;

        const orderIdArr  = singleorder.id.split('-');
        const orderid     = orderIdArr[0];

        return (
            <ProductConsumer>
            {(value) => {

                const{ getOrderStatusColorAndTitle } = value;

                const orderstatus = getOrderStatusColorAndTitle(singleorder.order_status);

                return (
                    <Box display="flex" justifyContent="flex-start" m={1} bgcolor="background.paper">
                        <Container maxWidth="lg" style={{marginBottom:'.5rem'}}>
                            <Box display="flex" fontWeight={500} style={{marginBottom:'.5rem'}}>
                                <Box p={1} flexGrow={1} style={{color:'#00B970'}}>
                                    Order #{orderid}<br />
                                </Box>
                                <Box p={1}>
                                {nosh_localdata.restaurant_currency !== "" && nosh_localdata.restaurant_currency !== undefined ? `${nosh_localdata.restaurant_currency}`:<i className="fa fa-inr"></i>} {singleorder.total_amount.toFixed(2)}
                                    <br /><Box fontWeight="normal">{singleorder.total_quantity} items</Box>
                                </Box>
                            </Box>
                            <Divider />
                            {
                                singleorder.items.map((item, i)=>{
                                    return(
                                        <Box display="flex" style={{marginBottom:'.5rem'}} key={i}>
                                            <Box p={1} flexGrow={1}>
                                                {item.item_name}
                                            </Box>
                                            <Box p={1}>
                                            {nosh_localdata.restaurant_currency !== "" && nosh_localdata.restaurant_currency !== undefined ? `${nosh_localdata.restaurant_currency}`:<i className="fa fa-inr"></i>} {Number(item.price).toFixed(2)}
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                            <Box display="flex" alignItems="center" style={{marginBottom:'.5rem'}}>
                                <Box p={1} flexGrow={1} fontWeight="500">
                                    Status
                                </Box>
                                <Box p={1}>
                                    <span style={{color:orderstatus.color}}>{orderstatus.title}</span>
                                </Box>
                            </Box>
                            <Divider />
                        </Container>
                    </Box>
                );
            }}
            </ProductConsumer>
        );
	}
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Order));